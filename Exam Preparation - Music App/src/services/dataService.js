import * as request from './requester.js';

export const getAll = () =>
    request.get('/data/albums?sortBy=_createdOn%20desc&distinct=name')

export const create = (data) => 
    request.post('/data/albums', data);

export const getById = (id) =>
    request.get(`/data/albums/${id}`);

export const edit = (id, data) =>
    request.put(`/data/albums/${id}`, data);

export const del = (id) =>
    request.delete(`/data/albums/${id}`);

export const getOwn = (userId) => 
    request.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)

export const getByQuery = (query) => 
    request.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);