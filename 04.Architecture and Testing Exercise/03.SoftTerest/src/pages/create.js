import { createIdea } from "../api/data.js";

const section = document.getElementById('createPage')
const formElement = section.querySelector('form');

formElement.addEventListener('submit', onSubmit)

let ctx = null;

export function showCreate(context){
    ctx = context;
    context.showSection(section);
}

async function onSubmit(e){
    e.preventDefault();

    const formData = new FormData(formElement);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageURL');

    await createIdea({
        title,
        description,
        img
    });
    formElement.reset();
    ctx.goTo('/catalog');
}