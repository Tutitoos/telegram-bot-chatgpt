import { type ExtendedClient, type ExtendedEvent } from "../structures";
import fs from "fs";
import mongoose from "mongoose";

const registerEvents = async (client: ExtendedClient): Promise<void> => {
	const files: string[] = [];

	fs.readdirSync(`${__dirname}/../events`).forEach((category: string) => {
		fs.readdirSync(`${__dirname}/../events/${category}`)
			.filter((file: string) => file.endsWith(".ts") || file.endsWith(".js"))
			.forEach((file: string) =>
				files.push(`${__dirname}/../events/${category}/${file}`),
			);
	});

	files.forEach(async (file) => {
		try {
			const eventAsync = (await import(file)) as {
				default: new () => ExtendedEvent;
			};
			// eslint-disable-next-line new-cap
			const event: ExtendedEvent = new eventAsync.default();

			if (event.name.length > 0) {
				client.events.set(event.name, event);

				switch (event.category) {
					case "bot":
						client[event.once ? "once" : "on"](
							event.name as never,
							async (...args: unknown[]) => event.run(client, ...args),
						);
						break;
					case "mongodb":
						mongoose.connection.on(event.name, async (...args: unknown[]) =>
							event.run(client, ...args),
						);
						break;
					case "redis":
						client.redisClient.on(event.name, async (...args: unknown[]) =>
							event.run(client, ...args),
						);
						break;
					case "node":
						process.on(event.name, async (...args: unknown[]) =>
							event.run(client, ...args),
						);
						break;
					default:
						break;
				}
			}
		} catch (error: unknown) {
			const { message } = error as Error;

			client.logger.error("Bot", `Error al registrar los eventos, ${message}`);
		}
	});
};

export default registerEvents;
