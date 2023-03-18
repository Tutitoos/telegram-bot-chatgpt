import connectMongoDb from "../../mongodb/database";
import { connectRedis } from "../../redis/database";
import { ExtendedClient, ExtendedEvent } from "../../structures";

class EventBot extends ExtendedEvent {
	constructor() {
		super({
			name: "ready",
			category: "bot",
			once: true,
		});
	}

	async run(client: ExtendedClient): Promise<void> {
		const { username } = await client.getMe();

		client.logger.info("Bot", `Cliente ${username} conectado`);

		await connectMongoDb(client);
		await connectRedis(client);
	}
}

export default EventBot;
