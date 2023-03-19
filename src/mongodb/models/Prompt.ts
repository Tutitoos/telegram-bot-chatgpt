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

export default model("Prompt", promptSchema, "prompts");
