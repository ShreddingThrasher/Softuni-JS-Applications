import { html } from '../../node_modules/lit-html/lit-html.js'

const navigationTemplate = (user) => html`
            <a href="/all-memes">All Memes</a>
             <!-- Logged users -->
            ${user
                ? html`
                <div class="user">
                <a href="/create">Create Meme</a>
                <div class="profile">
                    <span>Welcome, ${user.email}</span>
                    <a href="/my-profile">My Profile</a>
                    <a href="/logout">Logout</a>
                </div>
                </div>`
                : html`<div class="guest">
                <div class="profile">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                <a class="active" href="/">Home Page</a>
            </div>`}
            <!-- Guest users -->
            
`

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
}