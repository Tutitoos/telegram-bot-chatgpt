import { generateResponse } from "../../openai/main";
import { ExtendedEvent } from "../../structures";
import type { ExtendedClient } from "../../structures";
import environments from "../../utils/environments";
import { classifyMessage } from "../../utils/managePrompt";
import type TelegramBot from "node-telegram-bot-api";
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
		client.logger.chat(`Message from ${userId} (${chatId}): ${message}`);

		const loaderMessage = (await client.sendMessage(
			chatId,
			"Cargando...",
		)) as EditMessageTextOptions;
		loaderMessage.chat_id = chatId;

		const { tokens, moderate } = await classifyMessage(message);

		if (tokens >= 3000) {
			await client.editMessageText(
				"El mensaje es demasiado largo",
				loaderMessage,
			);
			return;
		}

		if (moderate) {
			await client.editMessageText(
				"Lo siento, no puedo proporcionar contenido inapropiado. Como asistente de IA, estoy diseñado para proporcionar ayuda y responder preguntas relacionadas con informática, programación, arquitectura, ciencia y otros temas apropiados. ¿Hay alguna pregunta en particular que pueda ayudarte con respecto a estos temas?",
				loaderMessage,
			);
			return;
		}

		try {
			let response = await client.redis.message.get(message);
			if (!response) {
				response = await generateResponse(message);

				if (!response) {
					await client.editMessageText(
						"TutitoosBot no te está respondiendo? Es posible que esté experimentando algún tipo de problema técnico en ese momento. A veces, estos problemas pueden ser temporales y pueden resolverse por sí solos después de un tiempo.",
						loaderMessage,
					);
					return;
				}

				await client.redis.message.create({
					key: message,
					value: response,
				});
			}

			await client.editMessageText(response, loaderMessage);
		} catch (error: unknown) {
			const { message } = error as Error;

			await client.deleteMessage(chatId, loaderMessage.message_id!);
			await client.sendMessage(chatId, `Ha ocurrido un error,\n${message}`);
		}
	}
}

export default EventBot;
