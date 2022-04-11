import { showCatalog } from './pages/catalog.js';
import { showCreate } from './pages/create.js';
import { showDetails } from './pages/details.js';
import { showHome } from './pages/home.js';
import { showLogin } from './pages/login.js';
import { showRegister } from './pages/register.js';
import { initialize } from './pages/router.js';
import { logout } from './api/users.js';

document.getElementById('views').remove();

const links = {
    '/': showHome,
    '/register': showRegister,
    '/login': showLogin,
    '/catalog': showCatalog,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': onLogout
}

const router = initialize(links);
router.updateNav();
router.goTo('/');

function onLogout(){
    logout();
    router.updateNav();
    router.goTo('/');
}
