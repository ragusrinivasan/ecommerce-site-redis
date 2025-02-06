import type { CreateItemAttrs } from '$services/types';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { itemCacheKey } from '$services/keys';
import { deserialize } from './deserialize';

export const getItem = async (id: string) => { 
    const item =await client.hGetAll(itemCacheKey(id));

    return Object.keys(item).length ? deserialize(id, item) : null
};

export const getItems = async (ids: string[]) => { };

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
    const itemId = genId();

    await client.hSet(itemCacheKey(itemId), serialize(attrs));

    return itemId;
};
