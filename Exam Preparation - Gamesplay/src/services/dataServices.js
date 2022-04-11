import * as request from './requester.js';

export const getAll = (url) =>
    request.get(url);

export const create = (data) => 
    request.post('/data/games', data);

export const getById = (id) =>
    request.get(`/data/games/${id}`);

export const edit = (id, data) =>
    request.put(`/data/games/${id}`, data);

export const del = (id) =>
    request.delete(`/data/games/${id}`);

export const getOwn = (userId) => 
    request.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)

export const getByQuery = (query) => 
    request.get(`/data/cars?where=year%3D${query}`);

export const getComments = (gameId) =>
    request.get(`/data/comments?where=gameId%3D%22${gameId}%22`);

export const addComment = (commentData) => 
    request.post('/data/comments', commentData);