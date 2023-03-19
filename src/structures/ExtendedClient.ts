import registerEvents from "../handlers/registerEvents";
import mongoDbModels from "../mongodb/models";
import { type RedisClient, redisClient } from "../redis/database";
import { type Message } from "../redis/models";
import type ExtendedEvent from "./ExtendedEvent";
import ExtendedLogger from "./ExtendedLogger";
import TelegramBot from "node-telegram-bot-api";
import type { ConstructorOptions } from "node-telegram-bot-api";

class ExtendedClient extends TelegramBot {
	isReadyClient: boolean;
	logger: ExtendedLogger;
	events: Map<string, ExtendedEvent>;
	mongodb: typeof mongoDbModels;
	redisClient: RedisClient;
	redis: {
		message: Message;
	};

	constructor(token: string, props: ConstructorOptions) {
		super(token, props);

		this.isReadyClient = false;
		this.logger = new ExtendedLogger();
		this.events = new Map();
		this.mongodb = mongoDbModels;
		this.redisClient = redisClient;
	}

	async run(): Promise<void> {
		await registerEvents(this);
		setTimeout(() => {
			if (!this.isReadyClient) {
				this.isReadyClient = true;
				this.emit("ready");
			}
		}, 2000);
	}
}

export default ExtendedClient;
