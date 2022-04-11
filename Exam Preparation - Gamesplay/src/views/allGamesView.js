import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataServices.js';

const allGamesTemplate = (games) => html`
        <section id="catalog-page">
            <h1>All Games</h1>
            <!-- Display div: with information about every game (if any) -->
            ${games.length > 0
                ? games.map(g => gameCardTemplate(g))
                : html`<h3 class="no-articles">No articles yet</h3>`}

            <!-- Display paragraph: If there is no games  -->
            
        </section>
`;

export const allGamesView = async (ctx) => {
    const games = await dataService.getAll('/data/games?sortBy=_createdOn%20desc');

    ctx.render(allGamesTemplate(games));
}

const gameCardTemplate = (game) => html`
            <div class="allGames">
                <div class="allGames-info">
                    <img src="${game.imageUrl}">
                    <h6>${game.category}</h6>
                    <h2>${game.title}</h2>
                    <a href="/details/${game._id}" class="details-button">Details</a>
                </div>
            </div>
`;