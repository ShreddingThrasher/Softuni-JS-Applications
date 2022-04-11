import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataServices.js';

const editTemplate = (onSubmit, theater) => html`
        <section id="editPage">
            <form class="theater-form" @submit=${onSubmit}>
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value="${theater.title}">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${theater.date}">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        value="${theater.author}">
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">${theater.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        value="${theater.imageUrl}">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;

export const editView = async (ctx) => {

    const theater = await dataService.getById(ctx.params.id);

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let title = formData.get('title');
        let date = formData.get('date');
        let author = formData.get('author');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        if(!title || !date || !author || !description || !imageUrl){
            return alert('Please fill all fields!')
        }

        const theaterData = {
            title,
            date,
            author,
            description,
            imageUrl
        }

        await dataService.edit(ctx.params.id, theaterData);

        form.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }

    ctx.render(editTemplate(onSubmit, theater));
}