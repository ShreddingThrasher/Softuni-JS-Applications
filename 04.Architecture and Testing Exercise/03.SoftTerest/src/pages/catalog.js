import { getAllIdeas } from "../api/data.js";

const section = document.getElementById('dashboard-holder')
section.addEventListener('click', onDetailsSelect);

let ctx = null;

export async function showCatalog(context){
    
    ctx = context;
    context.showSection(section);
    const ideas = await getAllIdeas();
    
    if(ideas.length > 0){
        section.replaceChildren(...ideas.map(createIdeaPreview));
    } else {
        section.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    }
}

function createIdeaPreview(idea){

    const element = document.createElement('div')
    element.className = 'card overflow-hidden current-card details';
    element.style.width = '20rem';
    element.style.height = '18rem';
    element.innerHTML = `
    <div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a data-id="${idea._id}" class="btn" href="/details">Details</a>
    `;

    return element;
}

function onDetailsSelect(e){
    
    if(e.target.tagName === 'A'){
        e.preventDefault();

        const id = e.target.dataset.id;

        if(id){
            ctx.goTo('/details', id);
        }
    }
}
