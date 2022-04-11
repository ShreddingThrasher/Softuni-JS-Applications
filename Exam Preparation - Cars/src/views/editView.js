import { html } from '../../node_modules/lit-html/lit-html.js'
import * as dataService from '../services/dataService.js';

const editTemplate = (listing, onSubmit) => html`
        <section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit=${onSubmit}>
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value="${listing.brand}">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value="${listing.model}">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value="${listing.description}">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value="${listing.year}">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${listing.imageUrl}">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value="${listing.price}">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
`;

export const editView = async (ctx) => {
    const listing = await dataService.getById(ctx.params.id)

    const onSubmit = async (e) => {
        e.preventDefault();

        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let brand = formData.get('brand');
        let model = formData.get('model');
        let description = formData.get('description');
        let year = Number(formData.get('year'));
        let imageUrl = formData.get('imageUrl');
        let price = Number(formData.get('price'));

        if(!brand || !model || !description || !year || !imageUrl || !price){
            return alert('Please fill all fields!');
        }

        const listingObj = {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        }

        let id = ctx.params.id;

        await dataService.edit(id, listingObj);
        
        form.reset();
        ctx.page.redirect(`/details/${id}`);
    }

    ctx.render(editTemplate(listing, onSubmit));
}