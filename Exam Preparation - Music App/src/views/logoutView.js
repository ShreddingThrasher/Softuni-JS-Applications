import * as userService from '../services/userService.js';

export const logoutView = async (ctx) => {
    await userService.logout();

    ctx.page.redirect('/');
}