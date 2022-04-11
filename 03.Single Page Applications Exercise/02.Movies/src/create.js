import { getAccessToken } from './auth.js';
import { hideAll, returnToHome } from './util.js';

const section = document.getElementById('add-movie');
const formElement = section.querySelector('form');

//creates movie record
formElement.addEventListener('submit', (e) => {

    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');

    if(!title || !description || ! imageUrl){
        return alert('Please fill all fields');
    }

    let newMovieObj = {
        title,
        description,
        img
    }

    const url = 'http://localhost:3030/data/movies';
    let accessToken = getAccessToken();

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify(newMovieObj)
    })
        .then(res => res.json())
        .then(data => {
            formElement.reset();
            hideAll();
            returnToHome();
        })
})

export function renderCreate(){
    section.style.display = 'block';
}
