import Prompt from "../mongodb/models/Prompt";
import type { ExtendedClient } from "../structures";
import natural from "natural";

const tokenizer = new natural.WordTokenizer();

export const classifyMessage = async (message: string): Promise<string> => {
	const filteredMessage = message.replace(/[^\w\s]/gi, "");
	const tokens = tokenizer.tokenize(filteredMessage.toLowerCase());

	const similarities: {
		category: string;
		similarity: number;
	}[] = [];

	const allPrompts = await Prompt.find().select(["-_id", "-__v"]).lean().exec();

	allPrompts.forEach(({ name, prompts }) => {
		const matches = tokens.filter((token) => prompts.includes(token));
		const similarity = matches.length / prompts.length;

		similarities.push({ category: name, similarity });
	});

	similarities.sort((a, b) => b.similarity - a.similarity);

	return similarities[0].category;
};

export const newPromptsToDatabase = async (
	client: ExtendedClient,
	list: { prompt: string; response: string }[],
) => {
	list.forEach(async (prompt) => {
		const classification = await classifyMessage(prompt.prompt);
		const categoryPrompt = await client.mongodb.Prompt.findOne({
			name: classification,
		}).exec();

		if (categoryPrompt && !categoryPrompt.prompts.includes(prompt.prompt)) {
			categoryPrompt.prompts.push(prompt.prompt);
			categoryPrompt.responses.push(prompt.response);

			await categoryPrompt.save();

			console.log("Nuevo", prompt.prompt, classification);
		} else {
			console.log("Ya esta", prompt.prompt, classification);
		}
	});
};
