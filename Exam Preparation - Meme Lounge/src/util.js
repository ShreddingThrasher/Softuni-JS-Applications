import { html, render } from '../node_modules/lit-html/lit-html.js';

export function getUserData(){
    return JSON.parse(localStorage.getItem('user'));
}

export function setUserData(user){
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearUserData(){
    localStorage.removeItem('user');
}

const section = document.querySelector('#notifications')

export const notificationMessage = (message) => {

    render(notificationTemplate(message), section);
    document.querySelector('.notification').style.display = 'block';

    setTimeout(() => {
        document.querySelector('#errorBox').remove();
    }, 3000);
}

const notificationTemplate = (message) => html`
            <div id="errorBox" class="notification">
                <span>${message}</span>
            </div>
`;