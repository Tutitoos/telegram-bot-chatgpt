import { ExtendedClient, ExtendedEvent } from "../../structures";

class EventRedis extends ExtendedEvent {
	constructor() {
		super({
			name: "error",
			category: "redis",
			once: false,
		});
	}

	async run(client: ExtendedClient, error: Error): Promise<void> {
		client.logger.error("Redis", `Error en la base de datos, ${error.message}`);
	}
}

export default EventRedis;
