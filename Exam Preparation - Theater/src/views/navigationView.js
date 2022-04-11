import { html } from '../../node_modules/lit-html/lit-html.js'

const navigationTemplate = (user) => html`
            <nav>
                <a href="/">Theater</a>
                <ul>
                    <!--Only users-->
                    ${user
                        ? html`
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/create">Create Event</a></li>
                    <li><a href="/logout">Logout</a></li>`
                        : html`
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>`}
                    <!--Only guest-->
                    
                </ul>
            </nav>
`

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
}