import { getAllStudents } from './api.js';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { studentsTemplate } from './studentsTemplate.js';
import { search } from './search.js';

const tableBody = document.querySelector('.container tbody');
const studentsData = await getAllStudents();

render(studentsTemplate(Object.values(studentsData)), tableBody);

const searchButton = document.querySelector('#searchBtn');
searchButton.addEventListener('click', search);