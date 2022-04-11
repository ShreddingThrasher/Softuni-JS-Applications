import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const catalogTemplate = (albums, isLogged) => html`
<section id="catalogPage">
            <h1>All Albums</h1>

            ${albums.length > 0
                ? albums.map(a => albumTemplate(a, isLogged))
                : html`<p>No Albums in Catalog!</p>`}

            
            <!--No albums in catalog-->            

        </section>
`

export const catalogView = async (ctx) => {

    let isLogged = ctx.user

    const albums = await dataService.getAll();
    ctx.render(catalogTemplate(albums, isLogged));
}

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