import { html } from '../../node_modules/lit-html/lit-html.js'
import * as dataService from '../services/dataService.js';

const detailsTemplate = (listing, isOwner) => html`
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src="${listing.imageUrl}">
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${listing.brand}</li>
                    <li><span>Model:</span>${listing.model}</li>
                    <li><span>Year:</span>${listing.year}</li>
                    <li><span>Price:</span>${listing.price}$</li>
                </ul>

                <p class="description-para">${listing.description}</p>

                ${isOwner
                    ? html`
                    <div class="listings-buttons">
                        <a href="/edit/${listing._id}" class="button-list">Edit</a>
                        <a href="/delete/${listing._id}" class="button-list">Delete</a>
                    </div>`
                    : ''}
            </div>
        </section>
`

export const detailsView = async (ctx) => {

    const listing = await dataService.getById(ctx.params.id);
    let isOwner = false;

    if(ctx.user){
        isOwner = ctx.user._id == listing._ownerId
    }

    ctx.render(detailsTemplate(listing, isOwner));
}