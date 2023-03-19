import "dotenv/config";

const getVariable = (name: string) => process.env[name] ?? "unknown";

const environments = {
	openaiKey: getVariable("OPENAI_KEY"),
	botToken: getVariable("BOT_TOKEN"),
	allowedUsers:
		getVariable("ALLOWED_USERS")
			.split(",")
			.map((user) => Number(user)) ?? [],
	mongodbUri: getVariable("MONGODB_URI"),
	mongodbName: getVariable("MONGODB_NAME"),
	redisHost: getVariable("REDIS_HOST"),
	redisPort: Number(getVariable("REDIS_PORT")),
	redisPassword: getVariable("REDIS_PASSWORD"),
};

export default environments;
