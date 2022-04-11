import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataServices from '../services/dataServices.js';
import * as util from '../util.js';


const editTemplate = (meme, onSubmit) => html`
        <section id="edit-meme">
            <form id="edit-form" @submit=${onSubmit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" value="${meme.title}">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${meme.imageUrl}">
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`;

export const editView = async (ctx) => {
    const meme = await dataServices.getById(ctx.params.id);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('edit');

        const form = e.currentTarget;
        const formData = new FormData(form);

        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        if(!title || !description || !imageUrl){
            util.notificationMessage('Please fill all fields!');
            return;
        }

        const memeData = {
            title,
            description,
            imageUrl
        }

        await dataServices.edit(ctx.params.id, memeData);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }

    ctx.render(editTemplate(meme, onSubmit));
}