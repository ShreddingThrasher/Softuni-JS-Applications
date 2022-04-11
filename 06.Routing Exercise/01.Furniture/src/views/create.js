import { createItem } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = (onSubmit, errorMsg, errors) => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : ''}
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        ${errors.make ? html`<div class="form-group error1">${errors.make.message}</div>` : ''}
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${'form-control' + (errors.make ? ' is-invalid' : '')} id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        ${errors.model ? html`<div class="form-group error1">${errors.model.message}</div>` : ''}
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${'form-control' + (errors.model ? ' is-invalid' : '')} id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        ${errors.year ? html`<div class="form-group error1">${errors.year.message}</div>` : ''}
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class=${'form-control' + (errors.year ? ' is-invalid' : '')} id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        ${errors.description ? html`<div class="form-group error1">${errors.description.message}</div>` : ''}
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class=${'form-control' + (errors.description ? ' is-invalid' : '')} id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        ${errors.price ? html`<div class="form-group error1">${errors.price.message}</div>` : ''}
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class=${'form-control' + (errors.price ? ' is-invalid' : '')} id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        ${errors.img ? html`<div class="form-group error1">${errors.img.message}</div>` : ''}
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class=${'form-control' + (errors.img ? ' is-invalid' : '')} id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`

export function createPage(ctx){
    
    update(null, {});

    function update(errorMsg, errors){
        ctx.render(createTemplate(onSubmit, errorMsg, errors));
    }

    async function onSubmit(e){
        e.preventDefault();

        const form = e.currentTarget;
        const formData = [... new FormData(form).entries()]

        const data = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        data.year = Number(data.year);
        data.price = Number(data.price);

        try {

            const missing = formData.filter(([k, v]) => k != 'material' && v == '');
            const errors = {};

            if(missing.length > 0){
                errors.message = 'Please fill all mandatory fields!';
            }

            if(data.make.length < 4){
                errors.make = new Error('Make must be at least 4 symbols long');
            }
            if(data.model.length < 4){
                errors.model = new Error('Model must be at least 4 symbols long');
            }
            if(data.year < 1950 || data.year > 2050){
                errors.year = new Error('Year must be between 1950 and 2050');
            }
            if(data.description.length < 10){
                errors.description = new Error('Description must be more than 10 symbols');
            }
            if(data.price < 0 || !data.price){
                errors.price = new Error('Price must be a positive number');
            }
            if(!data.img){
                errors.img = new Error('Image URL is required');
            }

            if(Object.keys(errors).length > 0){
                throw errors;
            }

            await createItem(data);
            form.reset();
            ctx.page.redirect('/');
        } catch(err){
            const message = err.message;
            update(message, err);
        }
    }
}