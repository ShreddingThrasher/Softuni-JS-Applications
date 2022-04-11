import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const editTemplate = (album, onSubmit) => html`
        <section class="editPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value="${album.name}">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${album.imgUrl}">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value="${album.price}">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${album.releaseDate}">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value="${album.artist}">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value="${album.genre}">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${album.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`

export const editView = async (ctx) => {
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let name = formData.get('name');
        let imgUrl = formData.get('imgUrl');
        let price = formData.get('price');
        let releaseDate = formData.get('releaseDate');
        let artist = formData.get('artist');
        let genre = formData.get('genre');
        let description = formData.get('description');

        if(!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description){
            return alert('Please fill all fields!');
        }

        const albumData = {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
        }

        const id = ctx.params.id;

        await dataService.edit(id, albumData);

        ctx.page.redirect(`/details/${id}`);
    }

    const album = await dataService.getById(ctx.params.id);
    ctx.render(editTemplate(album, onSubmit));
}