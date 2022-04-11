import { register } from "../api/users.js";

const section = document.getElementById('registerPage')
const formElement = section.querySelector('form');

formElement.addEventListener('submit', onSubmit)

let ctx = null;

export function showRegister(context){
    ctx = context;
    context.showSection(section);
}

async function onSubmit(e){

    e.preventDefault();

    const formData = new FormData(formElement);

    let email = formData.get('email');
    let password = formData.get('password');

    await register(email, password);
    formElement.reset();
    ctx.updateNav();
    ctx.goTo('/');
}