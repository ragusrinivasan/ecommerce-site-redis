import { createClient } from 'redis';

const client = createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT)
	}
});

client.on('error', (err) => console.log(err));

export { client };
export type Client = typeof client;
