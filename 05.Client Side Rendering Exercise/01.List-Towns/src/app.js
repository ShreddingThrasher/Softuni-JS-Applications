import { render } from '../../node_modules/lit-html/lit-html.js';
import { listOfTownsTemplate } from './templates/listOfTowns.js';

const inputElement = document.querySelector('#towns');
const loadButtonElement = document.querySelector('#btnLoadTowns');
const rootElement = document.querySelector('#root');

loadButtonElement.addEventListener('click', renderTowns)

function renderTowns(e){

    e.preventDefault();

    let towns = inputElement.value.split(', ');
    render(listOfTownsTemplate(towns), rootElement);
}