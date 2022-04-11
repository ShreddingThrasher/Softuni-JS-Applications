import { login } from '../api/api.js';
import { html } from '../lib.js';

const loginTemplate = (onSubmit, errorMsg) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : ''}
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${"form-control" + (errorMsg ? ' is-invalid' : '')} id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${"form-control" + (errorMsg ? ' is-invalid' : '')} id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
`
export function loginPage(ctx){

    update();

    function update(errorMsg){
        ctx.render(loginTemplate(onSubmit, errorMsg));
    }

    async function onSubmit(e){
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if(!email || !password){
            return alert('Plese fill all fields')
        }

        try {
            await login(email, password);
            form.reset();
            ctx.updateUserNav();
            ctx.page.redirect('/');
        } catch(err){
            update(err.message);
        }
    }
}