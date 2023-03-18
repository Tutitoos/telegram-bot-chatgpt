import chalk, { Color } from "chalk";
import { getFormatDate } from "util-tiempo";

class ExtendedLogger {
	color: typeof Color;
	namespace: string;
	message: string;

	constructor() {
		this.setColor("blueBright");
		this.setNamespace("System");
	}

	setColor(color: typeof Color): this {
		this.color = color;

		return this;
	}

	setNamespace(namespace: string): this {
		this.namespace = namespace;

		return this;
	}

	setMessage(message: string): this {
		this.message = message;

		return this;
	}

	log(): string {
		const message = `[${getFormatDate()}] [${this.namespace}]: ${this.message}`;

		console.log(chalk[this.color](message));

		return message;
	}

	error(namespace: string, message: string) {
		this.setColor("redBright");
		this.setNamespace(namespace);
		this.setMessage(message);

		return this.log();
	}

	info(namespace: string, message: string) {
		this.setColor("blueBright");
		this.setNamespace(namespace);
		this.setMessage(message);

		return this.log();
	}
}

export default ExtendedLogger;
