import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const registerTemplate = (onSubmit) => html`
        <section id="register">
            <div class="container">
                <form id="register-form" @submit=${onSubmit}>
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr>

                    <p>Username</p>
                    <input type="text" placeholder="Enter Username" name="username" required>

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" required>

                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                    <hr>

                    <input type="submit" class="registerbtn" value="Register">
                </form>
                <div class="signin">
                    <p>Already have an account?
                        <a href="/login">Sign in</a>.
                    </p>
                </div>
            </div>
        </section>
`

export const registerView = (ctx) => {
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        let username = formData.get('username');
        let password = formData.get('password');
        let repeat = formData.get('repeatPass');

        if(!username || !password || !repeat){
            return alert('Please fill all fields!');
        }

        if(password != repeat){
            return alert('Password don\'t match!');
        }

        await userService.register(username, password);

        form.reset();
        ctx.page.redirect('/all-listings');
    }

    ctx.render(registerTemplate(onSubmit));
}