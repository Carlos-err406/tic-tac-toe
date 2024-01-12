import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import pkg from 'pg';
const { Client } = pkg;
export const handle: Handle = async ({ event, resolve }) => {
	try {
		const client = new Client({
			connectionString: env.POSTGRES_URL
		});
		await client.connect();
		event.locals.client = client;
	} catch {}
	const response = await resolve(event);
	return response;
};
