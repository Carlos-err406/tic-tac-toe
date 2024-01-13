import { env } from '$env/dynamic/private';
import pkg from 'pg';
const { Client } = pkg;
const client = new Client({
	connectionString: env.POSTGRES_URL
});

const getPGClient = async () => {
	try {
		await client.connect();
	} catch {}
	return client;
};

export { client };
export default getPGClient;
