import { html } from '../../../node_modules/lit-html/lit-html.js';

export const tableTemplate = () => html`
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
`