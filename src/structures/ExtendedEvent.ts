import ExtendedClient from "./ExtendedClient";

interface EventStrcuture {
	name: string;
	category: string;
	once: boolean;
}

abstract class ExtendedEvent implements EventStrcuture {
	name: string;
	category: string;
	once: boolean;

	constructor({ name, category, once }: EventStrcuture) {
		this.name = name;
		this.category = category;
		this.once = once;
	}

	abstract run(client: ExtendedClient, ...args: unknown[]): Promise<unknown>;
}

export default ExtendedEvent;
