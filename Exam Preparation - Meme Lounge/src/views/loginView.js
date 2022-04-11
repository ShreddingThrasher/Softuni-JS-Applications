import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';
import * as util from '../util.js';

const loginTemplate = (onSubmit) => html`
        <section id="login">
            <form id="login-form" @submit=${onSubmit}>
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
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
            util.notificationMessage('Please fill all fields!');
            return;
        }

        await userService.login(email, password);

        form.reset();
        ctx.page.redirect('/all-memes');
    }
    
    ctx.render(loginTemplate(onSubmit));
}