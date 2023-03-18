// import "./bot/main";
// import "./mongodb/database";
// import "./redis/database";

import { ExtendedClient, ExtendedLogger } from "./structures";
import environments from "./utils/environments";

const { botToken } = environments;
const logger = new ExtendedLogger();

try {
	const client = new ExtendedClient(botToken, {
		polling: true,
	});

	client.run();
} catch (error: unknown) {
	const { message } = error as Error;

	logger.error("Bot", `Error al iniciar: ${message}`);
	process.exit(1);
}
