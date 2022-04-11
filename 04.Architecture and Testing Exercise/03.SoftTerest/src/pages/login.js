import { login } from "../api/users.js";

const section = document.getElementById('loginPage');
const formElement = section.querySelector('form');

formElement.addEventListener('submit', onSubmit);

let ctx = null;

export function showLogin(context){
    ctx = context;
    context.showSection(section);
}

async function onSubmit(e){
    e.preventDefault();

    const formData = new FormData(formElement);

    let email = formData.get('email');
    let password = formData.get('password');

    await login(email, password);
    formElement.reset();
    ctx.updateNav();
    ctx.goTo('/');
}