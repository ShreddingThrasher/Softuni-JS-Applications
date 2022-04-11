import * as request from './requester.js';

export const getAll = () =>
    request.get('/data/cars?sortBy=_createdOn%20desc')

export const create = (data) => 
    request.post('/data/cars', data);

export const getById = (id) =>
    request.get(`/data/cars/${id}`);

export const edit = (id, data) =>
    request.put(`/data/cars/${id}`, data);

export const del = (id) =>
    request.delete(`/data/cars/${id}`);

export const getOwn = (userId) => 
    request.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)

export const getByQuery = (query) => 
    request.get(`/data/cars?where=year%3D${query}`);