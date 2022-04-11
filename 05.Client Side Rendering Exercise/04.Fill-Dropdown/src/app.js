import { getAllOptionItems, addOption } from './api.js';
import { optionsTemplate } from './optionTemplate.js';
import { render } from '../../node_modules/lit-html/lit-html.js';

const menuSection = document.querySelector('#menu');
const optionsData = await getAllOptionItems();

const options = Object.values(optionsData);

render(optionsTemplate(options), menuSection);

const inputElement = document.querySelector('#itemText');
const addButton = document.querySelector('#addBtn');

addButton.addEventListener('click', (e) => {
    e.preventDefault();

    let text = inputElement.value;
    inputElement.value = '';

    addOption(text)
        .then(data => {
            options.push(data)
            render(optionsTemplate(options), menuSection);
        })
})