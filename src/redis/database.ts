import { type ExtendedClient } from "../structures";
import environments from "../utils/environments";
import { Message } from "./models";
import {
	type RedisClientType,
	type RedisFunctions,
	type RedisModules,
	type RedisScripts,
	createClient,
} from "redis";

const { redisHost, redisPort, redisPassword } = environments;

export type RedisClient = RedisClientType<
	RedisModules,
	RedisFunctions,
	RedisScripts
>;

export const redisClient = createClient({
	password: redisPassword,
	socket: {
		host: redisHost,
		port: redisPort,
	},
});

export const connectRedis = async (client: ExtendedClient): Promise<void> => {
	try {
		await redisClient.connect();

		client.redis = {
			message: new Message(client.redisClient),
		};
	} catch (error: unknown) {
		const { message } = error as Error;

		client.logger.error("Redis", `There was an error in database ${message}`);
	}
};
