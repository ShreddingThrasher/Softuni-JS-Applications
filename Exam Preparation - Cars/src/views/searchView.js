import { html } from '../../node_modules/lit-html/lit-html.js'
import * as dataService from '../services/dataService.js';
import { render } from '../../node_modules/lit-html/lit-html.js';

const searchTemplate = (searchHandler) => html`
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button class="button-list" @click=${searchHandler}>Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">

                <!-- Display all records -->

                <!-- Display if there are no matches -->
            </div>
        </section>
`;

export const searchView = (ctx) => {

    const searchHandler = async (e) => {
        
        const input = document.querySelector('#search-input');

        let query = input.value;
        input.value = '';

        const listings = await dataService.getByQuery(query);
        const section = document.querySelector('.listings');

        console.log(section);

        render(resultTemplate(listings), section);
    }

    ctx.render(searchTemplate(searchHandler));
}

const resultTemplate = (listings) => html`
                ${listings.length > 0
                    ? listings.map(l => listingTemplate(l))
                    : html`<p class="no-cars"> No results.</p>`}
`

const listingTemplate = (listing) => html`
                <div class="listing">
                    <div class="preview">
                        <img src="${listing.imageUrl}">
                    </div>
                    <h2>${listing.brand} ${listing.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${listing.year}</h3>
                            <h3>Price: ${listing.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${listing._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>
`;