import { html, render } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const searchTemplate = (searchHandler) => html`
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button class="button-list" @click=${searchHandler}>Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                <!--If have matches-->
                

                <!--If there are no matches-->
            </div>
        </section>
`;

export const searchView = (ctx) => {

    const searchHandler = async () => {
        const input = document.querySelector('#search-input');

        let query = input.value;
        input.value = '';

        const albums = await dataService.getByQuery(query);
        const section = document.querySelector('.search-result')

        render(resultTemplate(albums, ctx.user), section);
    }

    ctx.render(searchTemplate(searchHandler));
};

const resultTemplate = (albums, isLogged) => html`
    ${albums.length > 0
        ? albums.map(a => albumTemplate(a, isLogged))
        : html`<p class="no-result">No result.</p>`}
`;

const albumTemplate = (album, isLogged) => html`
            <div class="card-box">
                <img src="${album.imgUrl}">
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    ${isLogged
                        ? html`
                        <div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                        </div>`
                        : ''}
                </div>
            </div>
`;