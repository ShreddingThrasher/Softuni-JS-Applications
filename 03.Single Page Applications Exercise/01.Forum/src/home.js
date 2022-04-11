import { renderCommentsSection } from "./comments.js";
import { hideAll } from "./utils.js";

const section = document.querySelector('#home');
const formElement = section.querySelector('form');

//cancel form
formElement.querySelector('.cancel').addEventListener('click', (e) => {
    e.preventDefault();
    formElement.reset();
})

//submit form
formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let formData = new FormData(formElement);

    let topicName = formData.get('topicName');
    let username = formData.get('username');
    let postText = formData.get('postText');

    if(!topicName || !username || !postText){
        return alert('Please fill all fields');
    }

    let d = new Date();
    let time = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

    const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;

    await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({topicName, username, postText, time})
    })

    formElement.reset();
    updateHomepageContent();
    
})

//render page
export function renderHome(){
    hideAll();
    section.style.display = 'block';
    updateHomepageContent();
}

const topicsContainer = section.querySelector('.topic-container');

//update content
function updateHomepageContent(){

    const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            topicsContainer.innerHTML = '';

            for (const key in data) {

                let topicElement = document.createElement('div');
                topicElement.className = 'topic-name-wrapper';

                topicElement.innerHTML = `
                    <div class="topic-name">
                        <a href="#" class="normal" id="${data[key]._id}">
                            <h2>${data[key].topicName}</h2>
                        </a>
                    <div class="columns">
                        <div>
                            <p>Date: <time>${data[key].time}</time></p>
                            <div class="nick-name">
                                <p>Username: <span>${data[key].username}</span></p>
                            </div>
                        </div>


                    </div>
                </div>`;

                topicElement.querySelector('a').addEventListener('click', renderTopic);
                topicsContainer.appendChild(topicElement);
            }
        })
}

//renders the selected topic
function renderTopic(e){
    e.preventDefault();

    renderCommentsSection(e.currentTarget.id);
}