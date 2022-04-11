import { render } from '../../node_modules/lit-html/lit-html.js';

import { navigationView } from '../views/navigationView.js';

const headerRoot = document.querySelector('.navBar');
const contentElement = document.querySelector('#main-content');

const renderContent = (templateResult) => {
    render(templateResult, contentElement);
} 

export const renderNavigationMiddleware = (ctx, next) => {
    render(navigationView(ctx), headerRoot);
    next();
}

export const renderContentMiddleWare = (ctx, next) => {
    ctx.render = renderContent;
    next();
}