import { type ExtendedClient, ExtendedEvent } from "../../structures";

class EventMongoDd extends ExtendedEvent {
	constructor() {
		super({
			name: "connected",
			category: "mongodb",
			once: false,
		});
	}

	async run(client: ExtendedClient): Promise<void> {
		client.logger.database("MongoDB", "Base de datos conectada");
	}
}

export default EventMongoDd;
