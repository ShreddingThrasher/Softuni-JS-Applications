import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const loginTemplate = (onSubmit) => html`
        <section id="login-page" class="auth">
            <form id="login" @submit=${onSubmit}>

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </div>
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