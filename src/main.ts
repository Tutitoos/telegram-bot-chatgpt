import { ExtendedClient, ExtendedLogger } from "./structures";
import environments from "./utils/environments";

const { botToken } = environments;
const logger = new ExtendedLogger();

(async () => {
	try {
		const client = new ExtendedClient(botToken, {
			polling: true,
		});

		await client.run();
	} catch (error: unknown) {
		const { message } = error as Error;

		logger.error("Bot", `Error al iniciar: ${message}`);
		process.exit(1);
	}
})();
