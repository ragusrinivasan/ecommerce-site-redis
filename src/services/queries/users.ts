import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { userCacheKey } from '$services/keys';



export const getUserByUsername = async (username: string) => { };

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(userCacheKey(id));

    return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const userId = genId();

    await client.hSet(userCacheKey(userId), serialize(attrs));

    return userId;
};


const serialize = (user: CreateUserAttrs) => {
    const { username, password } = user;
    return {
        username,
        password
    }
};

const deserialize = (id: string, user: { [key: string]: string }) => {
    return {
        id,
        ...user
    };
};