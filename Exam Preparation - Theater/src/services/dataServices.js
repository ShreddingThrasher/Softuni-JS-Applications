import * as request from './requester.js';

export const getAll = () =>
    request.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title')

export const create = (data) => 
    request.post('/data/theaters', data);

export const getById = (id) =>
    request.get(`/data/theaters/${id}`);

export const edit = (id, data) =>
    request.put(`/data/theaters/${id}`, data);

export const del = (id) =>
    request.delete(`/data/theaters/${id}`);

export const getOwn = (userId) => 
    request.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)

export const like = (data) =>
    request.post('/data/likes', data);

export const getTheaterLikes = (theaterId) =>
    request.get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);

export const getOwnLikes = (theaterId, userId) =>
    request.get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`)