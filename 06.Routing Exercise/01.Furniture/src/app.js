import { logout } from './api/api.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

const root = document.querySelector('.container');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

//decorate context with render and updateNav functions
page(decorateContext);
page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', catalogPage);

page.start();
updateUserNav();


function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav(){
    const userData = getUserData();

    if(userData){
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#guest').style.display = 'inline-block';
        document.querySelector('#user').style.display = 'none';
    }
}

async function onLogout(){
    await logout();
    updateUserNav();
    page.redirect('/');
}