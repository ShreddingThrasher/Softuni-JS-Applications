import { html } from '../../../node_modules/lit-html/lit-html.js';


export const tableRowsTemplate = (context) => html`
            ${context.books.map(b => bookRowTemplate(b, context.deleteFunction, context.editButtonHandler))}
`

const bookRowTemplate = (book, deleteFunc, updateHandler) => {

    console.log(book);
    console.log(deleteFunc);
    console.log(updateHandler);
    console.log(book._id);
    return html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click=${updateHandler.bind(null, book._id)}>Edit</button>
            <button @click=${deleteFunc.bind(null, book._id)}>Delete</button>
        </td>
    </tr>
`
}
