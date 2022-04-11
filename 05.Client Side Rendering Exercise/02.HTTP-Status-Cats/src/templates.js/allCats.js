import { html } from '../../../node_modules/lit-html/lit-html.js';
import { catTemplate } from './cat.js'

export const allCatsTemplate = (cats, eventHandler) => html`
        <ul>
            ${cats.map(c => catTemplate(c, eventHandler))}
        </ul>
`