import { hideAll } from "./utils.js"

const section = document.querySelector('#comments-section')
const formElement = section.querySelector('form');

export function renderCommentsSection(topicId){

    hideAll();
    section.style.display = 'block';
    renderHeaderSection(topicId);
    renderComments(topicId);
    
}

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    commentFormSubmitHander()
})

const commentsHeaderSection = section.querySelector('.header');
const commentsContentSection = section.querySelector('#user-comment');

//renders the current topic
function renderHeaderSection(topicId){
    let url = `http://localhost:3030/jsonstore/collections/myboard/posts/${topicId}`;

    commentsHeaderSection.innerHTML = '';
    commentsHeaderSection.id = topicId;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            commentsHeaderSection.innerHTML = `
                <img src="./static/profile.png" alt="avatar">
                <p><span>${data.username}</span> posted on <time>${data.time}</time></p>
                
                <p class="post-content">${data.postText}</p>`
        });
}

//renders comments for the current topic
function renderComments(topicId){

    const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            
            commentsContentSection.innerHTML = '';

            for (const key in data) {
                
                if(data[key]._topicId === topicId){
                    createCommentElement(data[key].username, data[key].postText, data[key].time);
                }
            }
        })
}

//submit new comment
function commentFormSubmitHander(){

    const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;

    let formData = new FormData(formElement);

    let postText = formData.get('postText');
    let username = formData.get('username');

    if(!postText || !username){
        return alert('Cannot submit annonymous or empty comment.')
    }

    let d = new Date();
    let time = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

    let comment = {
        postText,
        username,
        _topicId: commentsHeaderSection.id,
        time
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .then(data => {
            
            formElement.reset();
            createCommentElement(data.username, data.postText, data.time);
        })
}

function createCommentElement(username, text, time){
    let divElement = document.createElement('div');
    divElement.className = 'topic-name-wrapper';

    divElement.innerHTML = `
        <div class="topic-name">
            <p><strong>${username}</strong> commented on <time>${time}</time></p>
            <div class="post-content">
            <p>${text}</p>
            </div>
        </div>`;

    commentsContentSection.appendChild(divElement);
}