import { html } from '../../node_modules/lit-html/lit-html.js'
import * as userService from '../services/userService.js';

const loginTemplate = (onSubmit) => html`
        <section id="loginPage">
            <form class="loginForm" @submit=${onSubmit}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>
`;

export const loginView = (ctx) => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let email = formData.get('email');
        let password = formData.get('password');

        if(!email || !password){
            return alert('Please fill all fields!')
        }

        await userService.login(email, password);

        form.reset();
        ctx.page.redirect('/dashboard');
    }

    ctx.render(loginTemplate(onSubmit));
}