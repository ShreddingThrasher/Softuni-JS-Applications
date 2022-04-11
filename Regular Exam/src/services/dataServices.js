import * as request from './requester.js';

export const getAll = () =>
    request.get('/data/pets?sortBy=_createdOn%20desc&distinct=name')

export const create = (data) => 
    request.post('/data/pets', data);

export const getById = (id) =>
    request.get(`/data/pets/${id}`);

export const edit = (id, data) =>
    request.put(`/data/pets/${id}`, data);

export const del = (id) =>
    request.delete(`/data/pets/${id}`);

export const donate = (petId) =>
    request.post('/data/donation', { petId });

export const getTotalDonation = (petId) =>
    request.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);

export const getOwnDonation = (petId, userId) => 
    request.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)