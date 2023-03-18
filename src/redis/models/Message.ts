import type { RedisClient } from "../database";

interface MessageProps {
	key: string;
	value: string;
}

class Message {
	redis: RedisClient;
	key: string | undefined;
	value: string | undefined;

	constructor(redis: RedisClient) {
		this.redis = redis;
	}

	create({ key, value }: MessageProps): Promise<string | null> {
		this.key = key;
		this.value = value;

		return this.redis.set(this.key, this.value);
	}

	get(key: string): Promise<string | null> {
		return this.redis.get(key);
	}

	async getAll() {
		const dataList: unknown[] = [];

		const interators = await this.redis.scanIterator();
		for await (const interator of interators) {
			const data = await this.redis.get(interator);
			dataList.push(data);
		}

		return dataList;
	}
}

export default Message;
