import cache from "memory-cache";

const cacheTtl = 5 * 60 * 1000;

const getAll = () => {
	return JSON.parse(cache.exportJson());
};

const add = (key: string, value: string) => {
	cache.put(key, value, cacheTtl);
};

const get = (key: string) => {
	return cache.get(key);
};

export default {
	getAll,
	add,
	get,
};
