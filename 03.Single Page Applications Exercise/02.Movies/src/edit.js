import { getAccessToken } from './auth.js';
import { showDetails } from './details.js';
import { hideAll } from './util.js';

const section = document.getElementById('edit-movie');

export function renderEdit(movieId){
    hideAll();
    section.style.display = 'block';
    fillFormFIelds(movieId);
}

const formElement = section.querySelector('form');

//fills the form with the data of the movie being edited
function fillFormFIelds(movieId){

    const url = `http://localhost:3030/data/movies/${movieId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            formElement.querySelector('#title').value = data.title
            formElement.querySelector('textarea').value = data.description;
            formElement.querySelector('#imageUrl').value = data.img
        })

    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        editMovie(e, movieId);
    })
}

//edits the movie record
function editMovie(e, movieId){

    let formData = new FormData(e.currentTarget);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');

    if(!title || !description || !img){
        console.log('asdfasdfa');
        return alert('Please fill all fields');
    }

    const url = `http://localhost:3030/data/movies/${movieId}`;
    let token = getAccessToken();

    fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({title, description, img})
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showDetails(movieId);
        })
}