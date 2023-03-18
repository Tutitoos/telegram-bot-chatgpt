import "dotenv/config";

const {
	OPENAI_KEY,
	BOT_TOKEN,
	ALLOWED_USERS,
	MONGODB_URI,
	MONGODB_NAME,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
} = process.env;

const environments = {
	openaiKey: OPENAI_KEY!,
	botToken: BOT_TOKEN!,
	allowedUsers: ALLOWED_USERS?.split(",").map((user) => +user) || [],
	mongodbUri: MONGODB_URI!,
	mongodbName: MONGODB_NAME!,
	redisHost: REDIS_HOST!,
	redisPort: +REDIS_PORT!,
	redisPassword: REDIS_PASSWORD!,
};

export default environments;
