import { render } from "../../node_modules/lit-html/lit-html.js";
import { getBookById } from "./api.js";
import { editFormTempalte } from './templates/formTemplates.js';

export async function editButtonHandler(id){

    document.querySelector('#add-form').style.display = 'none';
    const currBook = await getBookById(id);

    const formElement = document.querySelector('#edit-form');
    formElement.style.display = 'block';
    render(editFormTempalte(currBook, id), formElement);
}
