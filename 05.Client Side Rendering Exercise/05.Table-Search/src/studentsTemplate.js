import { html } from '../../node_modules/lit-html/lit-html.js';

export const studentsTemplate = (studentsData) => html`
    ${studentsData.map(s => row(s))}
`

const row = (student) => html`
    <tr>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
    </tr>
`