import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    'all': '/data/catalog',
    'byId': '/data/catalog/',
    'ownFurniture': (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    'create': '/data/catalog',
    'edit': '/data/catalog/',
    'delete': '/data/catalog/'
}

export async function getAllFurniture(){
    return api.get(endpoints.all);
}

export async function getFurnitureById(id){
    return api.get(endpoints.byId + id);
}

export async function getOwnFurniture(userId){
    return api.get(endpoints.ownFurniture(userId));
}

export async function createItem(data){
    return api.post(endpoints.create, data);
}

export async function editItem(id, data){
    return api.put(endpoints.edit + id, data);
}

export async function deleteItem(id){
    return api.delete(endpoints.delete + id);
}
