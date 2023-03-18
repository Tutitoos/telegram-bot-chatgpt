import registerEvents from "../handlers/registerEvents";
import mongoDbModels from "../mongodb/models";
import { RedisClient, redisClient } from "../redis/database";
import { Message } from "../redis/models";
import type ExtendedEvent from "./ExtendedEvent";
import ExtendedLogger from "./ExtendedLogger";
import TelegramBot from "node-telegram-bot-api";
import type { ConstructorOptions } from "node-telegram-bot-api";

class ExtendedClient extends TelegramBot {
	logger: ExtendedLogger;
	events: Map<string, ExtendedEvent>;
	mongodb: typeof mongoDbModels;
	redisClient: RedisClient;
	redis: {
		Message: Message;
	};

	constructor(token: string, props: ConstructorOptions) {
		super(token, props);

		this.logger = new ExtendedLogger();
		this.events = new Map();
		this.mongodb = mongoDbModels;
		this.redisClient = redisClient;
	}

	async run(): Promise<void> {
		await registerEvents(this);
		this.emit("ready");
	}
}

export default ExtendedClient;
