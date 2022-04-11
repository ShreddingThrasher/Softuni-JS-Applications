import { getUserData } from '../util.js';

export const authMiddleware = (ctx, next) => {
    ctx.user = getUserData();
    next();
}