import { html } from '../../node_modules/lit-html/lit-html.js'

const navigationTemplate = (user) => html`
            <h1><a class="home" href="/">GamesPlay</a></h1>
            <nav>
                <a href="/all-games">All games</a>
                ${user
                    ? html`
                <div id="user">
                    <a href="/create">Create Game</a>
                    <a href="/logout">Logout</a>
                </div>`
                    : html`
                <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>`}                
            </nav>
`

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user);
}