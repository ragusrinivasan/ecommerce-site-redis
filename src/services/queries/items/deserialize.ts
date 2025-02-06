import type { Item } from '$services/types';
import { DateTime } from 'luxon';

export const deserialize = (id: string, item: { [key: string]: string }): Item => {
    const { name, ownerId, imageUrl, description, highestBidUserId, createdAt, endingAt, views, likes, bids, price } = item;
    return {
        id,
        name,
        ownerId,
        imageUrl,
        description,
        highestBidUserId,
        createdAt: DateTime.fromMillis(parseInt(createdAt)),
        endingAt: DateTime.fromMillis(parseInt(endingAt)),
        views: parseInt(views),
        likes: parseInt(likes),
        bids: parseInt(bids),
        price: parseFloat(price)
    }
};
