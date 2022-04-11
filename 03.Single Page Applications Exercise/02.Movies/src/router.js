import { hideAll } from './util.js';
import { renderLogin } from './login.js';
import { renderRegister } from './register.js';
import { renderLogout } from './logout.js';
import { renderHome } from './home.js';
import { renderCreate } from './create.js';

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/logout': renderLogout,
    '/create': renderCreate
}

export function router(path){
    hideAll();
    
    let render = routes[path];
    render();
}
