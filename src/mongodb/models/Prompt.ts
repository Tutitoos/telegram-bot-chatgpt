import { Schema, model } from "mongoose";

const promptSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	prompts: {
		type: [String],
		required: true,
	},
	responses: {
		type: [String],
		required: true,
	},
});

const Prompt = model("Prompt", promptSchema, "prompts");

export default Prompt;
