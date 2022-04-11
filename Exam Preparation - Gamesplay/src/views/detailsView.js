import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataServices.js';

const detailsTemplate = (game, comments, isOwner, isLogged, onSubmit) => html`
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${game.imageUrl}" />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
                    ${game.summary}
                </p>

                ${isOwner
                    ? html`
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a href="/delete/${game._id}" class="button">Delete</a>
                </div>`
                    : ''}

                <!-- Bonus ( for Guests and Users ) -->
                
                ${commentsTemplate(comments, isLogged, isOwner, onSubmit)}
                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->


        </section>
`;

export const detailsView = async (ctx) => {
    
    const game = await dataService.getById(ctx.params.id);
    const comments = await dataService.getComments(ctx.params.id);

    let isOwner = false

    if(ctx.user){
        isOwner = ctx.user._id == game._ownerId;
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let content = formData.get('comment');

        if(!content){
            return alert('Cannot submit empty comment...');
        }

        const commentData = {
            gameId: ctx.params.id,
            comment: content
        }

        await dataService.addComment(commentData);

        form.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }

    ctx.render(detailsTemplate(game, comments, isOwner, ctx.user, onSubmit));
}

const commentsTemplate = (comments, isLogged, isOwner, onSubmit) => html`
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        ${comments.length > 0 
                            ? comments.map(c => commentTemplate(c))
                            : html`<p class="no-comment">No comments.</p>`
                        }
                    </ul>

                    ${isLogged && !isOwner
                        ? addCommentTemplate(onSubmit)
                        : ''}
                    <!-- Display paragraph: If there are no games in the database -->
                </div>
`;

const commentTemplate = (comment) => html`
                        <li class="comment">
                            <p>Content: ${comment.comment}</p>
                        </li>
`;

const addCommentTemplate = (onSubmit) => html`
                        <article class="create-comment">
                            <label>Add new comment:</label>
                            <form class="form" @submit=${onSubmit}>
                                <textarea name="comment" placeholder="Comment......"></textarea>
                                <input class="btn submit" type="submit" value="Add Comment">
                            </form>
                        </article>
`