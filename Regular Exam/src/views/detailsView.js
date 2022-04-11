import { html } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataServices.js';
import * as util from '../util.js';

const detailsTemplate = (pet, donations, user, isOwner, deleteHandler, donated, donateHandler) => html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${pet.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${donations * 100}$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    ${user
                        ? html`
                    <div class="actionBtn">
                        <!-- Only for registered user and creator of the pets-->
                        ${isOwner
                            ? html`
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a @click=${deleteHandler} href="javascript:void(0);" class="remove">Delete</a>`
                            : ''}
                        ${donated == 0 && !isOwner
                            ? html`
                            <a @click=${donateHandler} href="javascript:void(0);" class="donate">Donate</a>`
                            : ''}
                        <!--(Bonus Part) Only for no creator and user-->
                        
                    </div>`
                        : ''}
                </div>
            </div>
        </section>
`;

export const detailsView = async (ctx) => {

    const pet = await dataService.getById(ctx.params.id);

    const user = util.getUserData();

    let isOwner = false;

    if(user){
        isOwner = user._id == pet._ownerId;
    }

    const deleteHandler = async () => {

        const choice = confirm('Are you sure You want to remove this pet?');
        
        if(choice){
            await dataService.del(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
    }

    const donateHandler = async (e) => {
        const donationElement = document.querySelector('.donation');

        const totalDonation = await dataService.getTotalDonation(ctx.params.id);

        donationElement.textContent = `Donation: ${totalDonation * 100}$`;
        document.querySelector('.donate').remove();

        await dataService.donate(ctx.params.id);
    }

    const donations = await dataService.getTotalDonation(ctx.params.id);
    
    let donated = false;

    if(user){
        donated = await dataService.getOwnDonation(ctx.params.id, user._id);
    }

    ctx.render(detailsTemplate(pet, donations, user, isOwner, deleteHandler, donated, donateHandler));
};