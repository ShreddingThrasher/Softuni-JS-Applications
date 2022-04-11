import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataServices from '../services/dataServices.js';
import * as util from '../util.js';

const profileTemplate = (user, memes) => html`
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="${user.gender == 'male'
                                                                    ? '/images/male.png'
                                                                    : '/images/female.png'}">
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                <!-- Display : All created memes by this user (If any) --> 
                ${memes.length > 0
                    ? memes.map(m => memeTemplate(m))
                    : html`<p class="no-memes">No memes in database.</p>`}

                <!-- Display : If user doesn't have own memes  --> 
                
            </div>
        </section>
`;

export const profileView = async (ctx) => {

    const user = util.getUserData();
    const memes = await dataServices.getOwn(user._id);
    ctx.render(profileTemplate(user, memes))
}

const memeTemplate = (meme) => html`
                <div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
                    <a class="button" href="/details/${meme._id}">Details</a>
                </div>
`;