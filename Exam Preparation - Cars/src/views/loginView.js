import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/userService.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="container">
        <form id="login-form" action="#" method="post" @submit=${onSubmit}>
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>
`

export const loginView = (ctx) => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        let username = formData.get('username');
        let password = formData.get('password');


        if(!username || !password){
            return alert('Please fill all fields!');
        }

        await userService.login(username, password);

        form.reset();
        ctx.page.redirect('/all-listings');
    }

    ctx.render(loginTemplate(onSubmit));
}