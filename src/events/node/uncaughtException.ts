import { ExtendedClient, ExtendedEvent } from "../../structures";

export default class EventNode extends ExtendedEvent {
	constructor() {
		super({
			name: "uncaughtException",
			category: "node",
			once: false,
		});
	}
	async run(client: ExtendedClient, error: Error): Promise<void> {
		client.logger.error("Node", error.stack || error.message);
	}
}
