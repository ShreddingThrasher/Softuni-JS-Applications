import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataServices.js';
import * as util from '../util.js';

const profileTemplate = (user, theaters) => html`
        <section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${user.email}</h2>
            </div>
            <div class="board">
                <!--If there are event-->
                ${theaters.length > 0
                    ? theaters.map(t => eventTemplate(t))
                    : html`
                <div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`}

                <!--If there are no event-->
                
            </div>
        </section>
`;

export const profileView = async (ctx) => {
    const user = util.getUserData();

    const theaters = await dataService.getOwn(user._id);

    ctx.render(profileTemplate(user, theaters));
}

const eventTemplate = (theater) => html`
                <div class="eventBoard">
                    <div class="event-info">
                        <img src="${theater.imageUrl}">
                        <h2>${theater.title}</h2>
                        <h6>${theater.date}</h6>
                        <a href="/details/${theater._id}" class="details-button">Details</a>
                    </div>
                </div>
`;