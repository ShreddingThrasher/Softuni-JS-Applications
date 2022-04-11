import * as request from './requester.js';
import * as util from '../util.js';

export async function login(username, password){

    const result = await request.post('/users/login', { username, password});

    const userData = {
        username: result.username,
        _id: result._id,
        token: result.accessToken
    };

    util.setUserData(userData);
}

export async function register(username, password){

    const result = await request.post('/users/register', { username, password});

    const userData = {
        username: result.username,
        _id: result._id,
        token: result.accessToken
    };

    util.setUserData(userData);
}

export async function logout(){

    await request.get('/users/logout');
    util.clearUserData();
}
