import { type ExtendedClient } from "../structures";
import environments from "../utils/environments";
import {
	type ChatCompletionRequestMessage,
	Configuration,
	OpenAIApi,
} from "openai";

const { openaiKey } = environments;

const configuration = new Configuration({
	apiKey: openaiKey,
});
const openai = new OpenAIApi(configuration);

export const connectOpenIa = (client: ExtendedClient) => {
	client.logger.openIa("Inteligencia Artificial conectada");
};

export const generateResponse = async (
	message: string,
): Promise<string | null> => {
	try {
		const promptDefault =
			"Eres 'TutitoosBot', un asistente basado en IA que te ayuda en cualquier pregunta de informatica, programacion, arquietctura, ciencia, etc...";
		const prompt: ChatCompletionRequestMessage = {
			role: "user",
			content: message,
		};

		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "system", content: promptDefault }, prompt],
			temperature: 0.7,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			max_tokens: 100,
		});

		const responseData = response.data;

		return responseData.choices[0].message?.content ?? null;
	} catch (error: unknown) {
		const { message } = error as Error;

		return `Hubo un error en la petición:  ${message}`;
	}
};

export const checkModeration = async (message: string): Promise<boolean> => {
	const moderationResponse = await openai.createModeration({
		input: message,
	});

	return moderationResponse.data.results[0]?.flagged;
};
