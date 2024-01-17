import { env } from '$env/dynamic/private';
import createPostgresSubscriber from 'pg-listen';

const client = createPostgresSubscriber({
	connectionString: env.DATABASE_URL
});

const getSubscriberClient = async () => {
	try {
		await client.connect();
	} catch {}
	return client;
};

export { client };
export default getSubscriberClient;
