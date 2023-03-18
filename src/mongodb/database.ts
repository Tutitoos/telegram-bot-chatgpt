import { ExtendedClient } from "../structures";
import environments from "../utils/environments";
import mongoose from "mongoose";

const { mongodbUri, mongodbName } = environments;

const connectMongoDb = async (client: ExtendedClient) => {
	try {
		await mongoose.connect(mongodbUri, {
			dbName: mongodbName,
		});
	} catch (error: unknown) {
		const { message } = error as Error;

		client.logger.error("MongoDB", `There was an error in database ${message}`);
	}
};

export default connectMongoDb;
