import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataServices from '../services/dataServices.js';
import * as util from '../util.js';

const createTemplate = (onSubmit) => html`
        <section id="create-meme">
            <form id="create-form" @submit=${onSubmit}>
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>
`;

export const createView = (ctx) => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        if(!title || !description || !imageUrl){
            util.notificationMessage('Please fill all fields!')
            return;
        }

        const memeData = {
            title,
            description,
            imageUrl
        }

        await dataServices.create(memeData);

        ctx.page.redirect('/all-memes');
    }

    ctx.render(createTemplate(onSubmit));
}