import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataServices from '../services/dataServices.js';
import * as util from '../util.js';

const detailsTemplate = (meme, isOwner, deleteHandler) => html`
        <section id="meme-details">
            <h1>Meme Title: ${meme.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${meme.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${meme.description}</p>

                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    ${isOwner
                        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                               <button class="button danger" @click=${deleteHandler}>Delete</button>`
                        : ''}
                    
                </div>
            </div>
        </section>
`;

export const detailsView = async (ctx) => {
    const meme = await dataServices.getById(ctx.params.id);

    const deleteHandler = async () => {
        await dataServices.del(ctx.params.id);
        ctx.page.redirect('/all-memes');
    }

    let isOwner = false;
    const user = util.getUserData();

    if(user){
        isOwner = user._id == meme._ownerId;
    }

    ctx.render(detailsTemplate(meme, isOwner, deleteHandler))

}