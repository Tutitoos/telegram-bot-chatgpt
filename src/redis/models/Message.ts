import type { RedisClient } from "../database";

interface MessageProps {
	key: string;
	value: string;
}

class Message {
	key: string | undefined;
	value: string | undefined;

	constructor(public redis: RedisClient) {
		this.redis = redis;
	}

	async create({ key, value }: MessageProps): Promise<string | null> {
		this.key = key;
		this.value = value;

		return this.redis.set(this.key, this.value);
	}

	async get(key: string): Promise<string | null> {
		return this.redis.get(key);
	}

	async getAll() {
		const dataList: unknown[] = [];

		for await (const interator of this.redis.scanIterator()) {
			const data = await this.redis.get(interator);
			dataList.push(data);
		}

		return dataList;
	}
}

export default Message;
