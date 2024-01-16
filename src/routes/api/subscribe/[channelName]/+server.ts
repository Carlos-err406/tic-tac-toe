import type { RequestHandler } from '@sveltejs/kit';
import getSubscriberClient from '$lib/pg';

export const GET: RequestHandler = async ({ params }) => {
	const { channelName } = params as Record<string, string>;
	const client = await getSubscriberClient();
	await client.listenTo(channelName);
	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			client.notifications.on(channelName, async (payload) => {
				if (payload) {
					try {
						controller.enqueue(encoder.encode(JSON.stringify({ payload })));
					} catch {}
				}
			});
		}
	});
	return new Response(readable, {
		headers: {
			'content-type': 'text/event-stream'
		}
	});
};
