import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const registerTemplate = (onSubmit) => html`
        <section id="register-page" class="content auth">
            <form id="register" @submit=${onSubmit}>
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
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
        let confirm = formData.get('confirm-password');

        if(!email || !password || !confirm){
            return alert('Please fill all fields!');
        }

        if(password != confirm){
            return alert('Password don\'t match!');
        }

        await userService.register(email, password);

        form.reset();
        ctx.page.redirect('/');

    }

    ctx.render(registerTemplate(onSubmit));
}