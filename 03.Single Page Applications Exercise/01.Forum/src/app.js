import { renderHome } from './home.js';

renderHome();

document.querySelector('nav a').addEventListener('click', (e) => {
    e.preventDefault();
    renderHome();
});