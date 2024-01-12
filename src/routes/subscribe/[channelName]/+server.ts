import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { client } = locals;
	const { channelName } = params;
	await client.query(`LISTEN ${channelName}`);
	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			client.on('notification', async ({ payload, channel }) => {
				try {
					if (payload) {
						const jsonPayload = JSON.parse(payload);
						let data = {
							payload: jsonPayload,
							channel: channel
						};
						controller.enqueue(encoder.encode(JSON.stringify(data)));
					}
				} catch (e) {}
			});
		}
	});

	return new Response(readable, {
		headers: {
			'content-type': 'text/event-stream'
		}
	});
};
