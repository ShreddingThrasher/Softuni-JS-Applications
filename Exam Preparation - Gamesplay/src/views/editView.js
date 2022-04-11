import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataServices.js';

const editTemplate = (game, onSubmit) => html`
        <section id="edit-page" class="auth">
            <form id="edit" @submit=${onSubmit}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value="${game.title}">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value="${game.category}">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary">${game.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
`;

export const editView = async (ctx) => {
    const game = await dataService.getById(ctx.params.id);

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let title = formData.get('title');
        let category = formData.get('category');
        let maxLevel = formData.get('maxLevel');
        let imageUrl = formData.get('imageUrl');
        let summary = formData.get('summary');

        if(!title || !category || !maxLevel || !imageUrl || !summary){
            return alert('All fields are required!');
        }


        const gameData = {
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        }

        const id = ctx.params.id;

        await dataService.edit(id, gameData);

        form.reset();
        ctx.page.redirect(`/details/${id}`);
    }
    ctx.render(editTemplate(game, onSubmit));
}