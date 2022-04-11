import { render } from '../../node_modules/lit-html/lit-html.js';
import { allCatsTemplate } from './templates.js/allCats.js';
import { cats } from './catSeeder.js';

const allCatsSection = document.querySelector('#allCats');
render(allCatsTemplate(cats, showHideStatusCode), allCatsSection);

function showHideStatusCode(e){

    const statusSection = e.currentTarget.parentNode.querySelector('.status');

    if(e.currentTarget.textContent === 'Show status code'){
        statusSection.style.display = 'block';
        e.currentTarget.textContent = 'Hide status code';
    } else {
        statusSection.style.display = 'none';
        e.currentTarget.textContent = 'Show status code'
    }
}