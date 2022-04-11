import { html } from '../../node_modules/lit-html/lit-html.js'
import * as userService from '../services/userService.js';

const loginTemplate = (onSubmit) => html`
        <section id="loginPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`

export const loginView = (ctx) => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let email = formData.get('email');
        let password = formData.get('password');

        if(!email || !password){
            return alert('Please fill all fields!');
        }

        await userService.login(email, password);

        form.reset();
        ctx.page.redirect('/');
    }
    ctx.render(loginTemplate(onSubmit));
}