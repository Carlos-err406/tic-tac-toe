import type { EventNotificationResponse } from '$lib/types/EventNotification';
import { writable, type Writable } from 'svelte/store';

export class Subscriber<T> {
	private reader!: ReadableStreamDefaultReader<string>;
	public channel: string;
	public payload: Writable<T> = writable();
	public payloads: Writable<T[]> = writable([]);
	constructor(channel: string) {
		this.channel = channel;
	}
	public subscribe(): [Writable<T>, Writable<T[]>] {
		fetch(`/subscribe/${this.channel}`).then(async (response) => {
			this.reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
			while (true) {
				const { value, done } = await this.reader.read();
				if (done) break;
				const notificationResponse = JSON.parse(value) as EventNotificationResponse<T>;
				const data = notificationResponse.payload;
				this.payload.set(data);
				this.payloads.update((payloads) => [data, ...payloads]);
			}
		});
		return [this.payload, this.payloads];
	}
	public async unsubscribe() {
		try {
			await this.reader.cancel();
		} catch {}
	}
}
