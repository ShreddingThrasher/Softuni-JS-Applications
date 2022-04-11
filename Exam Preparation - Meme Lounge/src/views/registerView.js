import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';
import * as util from '../util.js';


const registerTemplate = (onSubmit) => html`
        <section id="register">
            <form id="register-form" @submit=${onSubmit}>
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male">
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>
`;

export const registerView = (ctx) => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPass = formData.get('repeatPass');
        let gender = formData.get('gender')

        if(!username || !email || !password || !repeatPass || !gender){
            util.notificationMessage('Please fill all fields!');
            return;
        }

        if(password != repeatPass){
            util.notificationMessage('Password don\'t match!');
            return;
        }

        const userData = {
            username,
            email,
            password,
            gender
        }

        await userService.register(userData);

        form.reset();
        ctx.page.redirect('/all-memes');

        console.log('register');
    }

    ctx.render(registerTemplate(onSubmit));
}