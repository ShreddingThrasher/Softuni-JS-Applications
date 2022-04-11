import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderContentMiddleWare, renderNavigationMiddleware } from './middlewares/renderMiddleware.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { profileView } from './views/profileView.js';
import { registerView } from './views/registerView.js';

page(authMiddleware);
page(renderNavigationMiddleware);
page(renderContentMiddleWare);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/profile', profileView);

page.start();