import { checkModeration } from "../openai/main";
import GPT3Tokenizer from "gpt3-tokenizer";

const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

const getTokens = (input: string): number => {
	const tokens = tokenizer.encode(input);

	return tokens.text.length;
};

export const classifyMessage = async (
	message: string,
): Promise<{
	tokens: number;
	moderate: boolean;
}> => {
	const tokens = getTokens(message);
	const moderate = await checkModeration(message);

	return {
		tokens,
		moderate,
	};
};

// Export const newPromptsToDatabase = async (
// 	client: ExtendedClient,
// 	list: Array<{ prompt: string; response: string }>,
// ) => {
// 	list.forEach(async (prompt) => {
// 		const classification = await classifyMessage(client, prompt.prompt);
// 		const categoryPrompt = await client.mongodb.prompt
// 			.findOne({
// 				name: classification,
// 			})
// 			.exec();

// 		if (categoryPrompt && !categoryPrompt.prompts.includes(prompt.prompt)) {
// 			categoryPrompt.prompts.push(prompt.prompt);
// 			categoryPrompt.responses.push(prompt.response);

// 			await categoryPrompt.save();

// 			console.log("Nuevo", prompt.prompt, classification);
// 		} else {
// 			console.log("Ya esta", prompt.prompt, classification);
// 		}
// 	});
// };
