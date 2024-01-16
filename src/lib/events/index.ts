import type { EventNotificationResponse } from '$lib/types/EventNotification';
import { get, writable, type Writable } from 'svelte/store';

export class Subscriber<T> {
	protected reader!: ReadableStreamDefaultReader<string>;
	public channel: string;
	public payload: Writable<T>;
	public payloads: Writable<T[]>;
	protected subscribed: boolean;
	constructor(channel: string) {
		this.channel = channel;
		this.payload = writable();
		this.payloads = writable([]);
		this.subscribed = false;
	}
	public subscribe(): [Writable<T>, Writable<T[]>] {
		if (this.subscribed) return [this.payload, this.payloads];
		this.subscribed = true;
		fetch(`/api/subscribe/${this.channel}`).then(async (response) => {
			this.reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
			while (true) {
				const { value, done } = await this.reader.read();
				if (done) break;
				const { payload } = JSON.parse(value) as EventNotificationResponse<T>;
				this.payload.set(payload);
				this.payloads.update((payloads) => [payload, ...payloads]);
			}
		});
		return [this.payload, this.payloads];
	}
	public setPayload(payload: T) {
		this.payload.set(payload);
		this.payloads.update((payloads) => [payload, ...payloads]);
	}
	public getPayloadData() {
		return get(this.payload);
	}
	public getPayloadsData() {
		return get(this.payloads);
	}
	public async unsubscribe() {
		try {
			if (this.subscribed) await this.reader.cancel();
		} catch {}
	}
}
