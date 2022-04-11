import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataServices.js';
import * as util from '../util.js';

const detailsTemplate = (theater,isLogged, isCreator, deleteHandler, likeHandler, liked, theaterLikes) => html`
        <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${theater.title}</h1>
                    <div>
                        <img src="${theater.imageUrl}" />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${theater.description}</p>
                    <h4>Date: ${theater.date}</h4>
                    <h4>Author: ${theater.author}</h4>
                    ${isLogged
                        ? html`
                    <div class="buttons">
                        ${isCreator
                            ? html`
                        <a @click=${deleteHandler} class="btn-delete" href="javascript:void(0);">Delete</a>
                        <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`
                            : ''}
                        ${!liked && !isCreator
                            ? html`
                        <a @click=${likeHandler} class="btn-like" href="javascript:void(0);">Like</a>`
                            : ''}
                    </div>`
                        : ''}
                    <p class="likes">Likes: ${theaterLikes}</p>
                </div>
            </div>
        </section>
`;

export const detailsView = async (ctx) => {

    const theater = await dataService.getById(ctx.params.id);

    let isOwner = false;

    let user = util.getUserData();

    if(user){
        isOwner = user._id == theater._ownerId;
    }

    const deleteHandler = async () => {
        const choice = confirm('Are you sure you want to delete this theater?');

        if(choice){
            await dataService.del(ctx.params.id);
            ctx.page.redirect('/profile');
        }
    }

    const likeHandler = async (e) => {
        await dataService.like({ theaterId: ctx.params.id });
        document.querySelector('.btn-like').style.display = 'none';

        const likesElement = document.querySelector('.likes');
        
        let currLikes = Number(likesElement.textContent.split(' ')[1])
        currLikes++;

        likesElement.textContent = `Likes: ${currLikes}`;
    }

    const theaterLikes = await dataService.getTheaterLikes(theater._id);
    const ownLikes = await dataService.getOwnLikes(theater._id, user._id);

    const liked = ownLikes > 0;

    ctx.render(detailsTemplate(theater, user, isOwner, deleteHandler, likeHandler, liked, theaterLikes));
}