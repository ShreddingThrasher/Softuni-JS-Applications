import { post, get} from './api.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
}

export async function login(email, password){

    await post(endpoints.login, {email, password})
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
        })
}

export async function register(email, password){

    await post(endpoints.register, {email, password})
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
        })
}

export async function logout(){

    get(endpoints.logout);
    localStorage.removeItem('user');
}