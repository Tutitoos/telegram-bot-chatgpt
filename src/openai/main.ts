import environments from "../utils/environments";
import { Configuration, OpenAIApi } from "openai";

const { openaiKey } = environments;

const configuration = new Configuration({
	apiKey: openaiKey,
});
const openai = new OpenAIApi(configuration);

console.log("OpenAI connected!");

export const generateResponse = async (
	message: string,
	category: string,
): Promise<string | null> => {
	try {
		const prompt = `Idioma: Español\nCategory: ${category}\nHuman: ${message}\n`;
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			temperature: 0.7,
			max_tokens: 150,
			frequency_penalty: 0.5,
			presence_penalty: 0.5,
			stop: [" Human:"],
		});

		const responseData = response.data;
		const answer = responseData.choices[0].text?.trim();

		return answer || null;
	} catch (error: unknown) {
		const { message } = error as Error;

		return `Hubo un error en la petición:  ${message}`;
	}
};
