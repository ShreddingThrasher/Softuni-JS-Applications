import * as userService from '../services/userService.js';

export const logoutView = async (ctx) => {

    const user = JSON.parse(localStorage.getItem('user'));

    // await fetch('http://localhost:3030/users/logout', {
    //     method: 'GET',
    //     headers: {
    //         'X-Authorization': user.token
    //     }
    // })

    await userService.logout();
    ctx.page.redirect('/');
}