import * as request from './requester.js';
import * as util from '../util.js';

export async function login(email, password){

    const result = await request.post('/users/login', { email, password});

    const userData = {
        email: result.email,
        gender: result.gender,
        username: result.username,
        _id: result._id,
        token: result.accessToken
    };

    util.setUserData(userData);
}

export async function register(registerData){

    const result = await request.post('/users/register', registerData);

    const userData = {
        email: result.email,
        gender: result.gender,
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