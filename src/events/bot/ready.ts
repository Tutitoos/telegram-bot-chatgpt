import connectMongoDb from "../../mongodb/database";
import { connectOpenIa } from "../../openai/main";
import { connectRedis } from "../../redis/database";
import { type ExtendedClient, ExtendedEvent } from "../../structures";

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

		client.logger.info("Bot", `Cliente ${username ?? "unknown"} conectado`);

		await connectMongoDb(client);
		await connectRedis(client);
		connectOpenIa(client);
	}
}

export default EventBot;
