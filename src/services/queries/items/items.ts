import type { CreateItemAttrs } from '$services/types';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { itemCacheKey } from '$services/keys';
import { deserialize } from './deserialize';

export const getItem = async (id: string) => {
    const item = await client.hGetAll(itemCacheKey(id));

    return Object.keys(item).length ? deserialize(id, item) : null
};

export const getItems = async (ids: string[]) => {
    const commands = ids.map(id => client.hGetAll(itemCacheKey(id)));

    const results = await Promise.all(commands);

    return results.map((result, i) => {
        if (Object.keys(result).length === 0) {
            return null;
        }

        return deserialize(ids[i], result)
    })
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
    const itemId = genId();

    await client.hSet(itemCacheKey(itemId), serialize(attrs));

    return itemId;
};
