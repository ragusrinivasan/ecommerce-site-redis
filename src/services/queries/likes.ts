import { client } from "$services/redis";
import { userLikesKey, itemCacheKey } from "$services/keys"

export const userLikesItem = async (itemId: string, userId: string) => {
    return client.sIsMember(userLikesKey(userId), itemId)
};

export const likedItems = async (userId: string) => { };

export const likeItem = async (itemId: string, userId: string) => {
    const inserted = await client.sAdd(userLikesKey(userId), itemId);

    if (inserted) {
        await client.hIncrBy(itemCacheKey(itemId), 'likes', 1);
    }
};

export const unlikeItem = async (itemId: string, userId: string) => {
    const removed = await client.sRem(userLikesKey(userId), itemId)

    if (removed) {
        await client.hIncrBy(itemCacheKey(itemId), 'likes', -1);
    }
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => { };
