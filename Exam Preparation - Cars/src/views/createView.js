import { html } from '../../node_modules/lit-html/lit-html.js'
import * as dataService from '../services/dataService.js';

const createTemplate = (onSubmit) => html`
        <section id="create-listing">
            <div class="container">
                <form id="create-form" @submit=${onSubmit}>
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
`;

export const createView = (ctx) => {

    const onSubmit = async (e) => {
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

        await dataService.create(listingObj);

        form.reset();
        ctx.page.redirect('/all-listings');
    }

    ctx.render(createTemplate(onSubmit));
}