import { townsTemplate } from './townsTemplate.js';
import { towns } from './towns.js';
import { search } from './search.js';
import { render } from '../../node_modules/lit-html/lit-html.js';

const townsSection = document.querySelector('#towns');
const searchButton = document.querySelector('article button');

render(townsTemplate(towns), townsSection);

searchButton.addEventListener('click', search);


