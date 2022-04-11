import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderContentMiddleWare, renderNavigationMiddleware } from './middlewares/renderMiddleware.js';
import { allListingsView } from './views/allListingsView.js';
import { createView } from './views/createView.js';
import { deleteView } from './views/deleteView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { myListingsView } from './views/myListingsView.js';
import { registerView } from './views/registerView.js';
import { searchView } from './views/searchView.js';

//decorate context
//first check authentication
//then render navigation
page(authMiddleware);
page(renderNavigationMiddleware);
page(renderContentMiddleWare);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/all-listings', allListingsView);
page('/logout', logoutView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/delete/:id', deleteView);
page('/my-listings', myListingsView);
page('/search', searchView);

page.start();

