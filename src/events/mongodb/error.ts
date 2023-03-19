import { type ExtendedClient, ExtendedEvent } from "../../structures";
import type { MongooseError } from "mongoose";

class EventMongoDb extends ExtendedEvent {
	constructor() {
		super({
			name: "error",
			category: "mongodb",
			once: false,
		});
	}

	async run(client: ExtendedClient, error: MongooseError): Promise<void> {
		client.logger.error(
			"MongoDB",
			`Error en la base de datos, ${error.message}`,
		);
	}
}

export default EventMongoDb;
