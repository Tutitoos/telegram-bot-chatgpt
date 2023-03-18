import { ExtendedClient, ExtendedEvent } from "../../structures";

class EventMongoDB extends ExtendedEvent {
	constructor() {
		super({
			name: "uncaughtException",
			category: "mongodb",
			once: false,
		});
	}

	async run(client: ExtendedClient): Promise<void> {
		client.logger.info("MongoDB", "Base de datos desconectada");
	}
}

export default EventMongoDB;
