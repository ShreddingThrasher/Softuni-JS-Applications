import { html } from '../../node_modules/lit-html/lit-html.js';

export const optionsTemplate = (options) => html`
    ${options.map(o => html`<option value="${o._id}">${o.text}</option>`)}    
`