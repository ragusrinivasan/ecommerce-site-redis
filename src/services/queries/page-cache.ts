import { pageCacheKey } from "$services/keys";
import { client } from "$services/redis";

const cacheRoutes = [
    '/about', '/privacy', '/auth/signin', '/auth/signup'
]

export const getCachedPage = (route: string) => {
    return cacheRoutes.includes(route) ? client.get(pageCacheKey(route)) : null
};

export const setCachedPage = (route: string, page: string) => {
    return cacheRoutes.includes(route) ? client.set(pageCacheKey(route), page, {
        EX: 2
    }) : null
};
