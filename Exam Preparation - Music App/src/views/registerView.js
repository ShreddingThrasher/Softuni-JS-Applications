import { html } from '../../node_modules/lit-html/lit-html.js'
import * as userService from '../services/userService.js';

const registerTemplate = (onSubmit) => html`
        <section id="registerPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`

export const registerView = (ctx) => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let email = formData.get('email');
        let password = formData.get('password');
        let confirm = formData.get('conf-pass');

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