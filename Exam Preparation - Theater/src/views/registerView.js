import { html } from '../../node_modules/lit-html/lit-html.js'
import * as userService from '../services/userService.js';

const registerTemplate = (onSubmit) => html`
        <section id="registerPage">
            <form class="registerForm" @submit=${onSubmit}>
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>
`;

export const registerView = (ctx) => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let email = formData.get('email');
        let password = formData.get('password');
        let repeat = formData.get('repeatPassword');

        if(!email || !password || !repeat){
            return alert('Please fill all fields!');
        }

        if(password != repeat){
            return alert('Password don\'t match!');
        }

        await userService.register(email, password);

        form.reset();
        ctx.page.redirect('/');
    }

    ctx.render(registerTemplate(onSubmit));
}