import type { Session } from '$services/types';
import { client } from '$services/redis';
import { sessionCacheKey } from '$services/keys'

export const getSession = async (id: string) => {
    const session = await client.hGetAll(sessionCacheKey(id));

    return Object.keys(session).length ? deserialize(id, session) : null
};

export const saveSession = async (session: Session) => {
    const { id } = session;
    return client.hSet(sessionCacheKey(id), serialize(session));
};

const serialize = (session: Session) => {
    const { userId, username } = session;
    return {
        userId,
        username
    };
}

const deserialize = (id: string, session: { [key: string]: string }) => {
    return {
        id,
        ...session
    };
};
