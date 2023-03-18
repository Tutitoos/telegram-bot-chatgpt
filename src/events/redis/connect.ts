import { ExtendedClient, ExtendedEvent } from "../../structures";

class EventRedis extends ExtendedEvent {
	constructor() {
		super({
			name: "connect",
			category: "redis",
			once: false,
		});
	}

	async run(client: ExtendedClient): Promise<void> {
		client.logger.info("Redis", "Base de datos conectada");
	}
}

export default EventRedis;
