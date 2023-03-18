import { generateResponse } from "../../openai/main";
import { ExtendedClient, ExtendedEvent } from "../../structures";
import environments from "../../utils/environments";
import { classifyMessage } from "../../utils/managePrompt";
import TelegramBot from "node-telegram-bot-api";
import type { EditMessageTextOptions } from "node-telegram-bot-api";

const { allowedUsers } = environments;

class EventBot extends ExtendedEvent {
	constructor() {
		super({
			name: "message",
			category: "bot",
			once: false,
		});
	}

	async run(client: ExtendedClient, msg: TelegramBot.Message): Promise<void> {
		const chatId = msg.chat.id;
		const userId = msg.from!.id;
		const message = msg.text!;

		if (!(userId || allowedUsers.includes(userId))) return;
		client.logger.info("Bot", `Message from ${userId} (${chatId}): ${message}`);

		const loaderMessage = (await client.sendMessage(
			chatId,
			"Cargando...",
		)) as EditMessageTextOptions;
		loaderMessage.chat_id = chatId;

		let response = await client.redis.Message.get(message);
		if (!response) {
			const classification = await classifyMessage(message);
			response = await generateResponse(message, classification);

			if (!response) {
				throw new Error("Invalid response");
			}

			await client.redis.Message.create({
				key: message,
				value: response,
			});
		}

		try {
			await client.editMessageText(`AI: ${response}`, loaderMessage);
		} catch (error: unknown) {
			const { message } = error as Error;

			await client.deleteMessage(chatId, loaderMessage.message_id!);
			await client.sendMessage(chatId, `Ha ocurrido un error,\n${message}`);
		}
	}
}

export default EventBot;
