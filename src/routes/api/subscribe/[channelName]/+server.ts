import type { RequestHandler } from '@sveltejs/kit';
import getPGClient from '$lib/pg';
export const GET: RequestHandler = async ({ params }) => {
	const { channelName } = params;
	const client = await getPGClient();
	await client.query(`LISTEN "${channelName}"`);
	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			client.on('notification', async ({ payload, channel }) => {
				if (payload && channel === channelName) {
					let data: string | object;
					try {
						data = JSON.parse(payload);
					} catch {
						data = payload;
					}
					try {
						controller.enqueue(
							encoder.encode(
								JSON.stringify({
									payload: data
								})
							)
						);
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
