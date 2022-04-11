import { checkOwner, hideAll, returnToHome } from "./util.js";
import { getAccessToken } from './auth.js';
import { renderEdit } from "./edit.js";

const section = document.getElementById('movie-example');
const container = section.querySelector('.container');

export function showDetails(movieId){

    hideAll();
    renderMovieDetails(movieId);
}

//renders the details for the selected movie
async function renderMovieDetails(movieId){
    container.innerHTML = '';
    section.style.display = 'block';

    const movie = await getMovieData(movieId);
    const user = JSON.parse(localStorage.getItem('user'));
    let liked = await checkIfLiked(movieId, user._id);

    container.innerHTML = `
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movie.img}"
                     alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${createButtons(movie._ownerId)}
                <span class="enrolled-span">Likes ${await getLikes(movieId, movie._ownerId)}</span>
            </div>
        </div>`;
    
    //check if the current user liked that movie
    if(liked.length > 0){

        let spanElement = container.querySelector('.enrolled-span');
        let likeId = liked[0]._id;

        //refresh span element content
        spanElement.textContent = spanElement.textContent.replace('Likes', 'Liked');

        //remove like button and adds click event to revoke the like
        container.querySelector('.btn-primary').remove();
        spanElement.addEventListener('click', async () => {
            await revokeLike(likeId);
            showDetails(movieId);
        });
    }

    attachEventListeners(container, movieId);
}

//creates buttons
function createButtons(movieId){

    if(checkOwner(localStorage.getItem('user'), movieId)){
        return `<a class="btn btn-danger" href="#">Delete</a>
                <a class="btn btn-warning" href="#">Edit</a>`;
                
    } else {
       return `<a class="btn btn-primary" href="#">Like</a>`;
    }
}

//gets data for the selected movie
async function getMovieData(movieId){

    const url = `http://localhost:3030/data/movies/${movieId}`;

    const res = await fetch(url);
    const movieData = await res.json();

    return movieData;
}

//gets the likes of the current movie
async function getLikes(movieId){
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`

    const resLikes = await fetch(url);
    const likes = await resLikes.json();

    return likes;
}

//function to check if the current user liked the movie
async function checkIfLiked(movieId, userId){
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`
    const resUserLikes = await fetch(url);
    const userLikes = await resUserLikes.json();

    return userLikes;
}

//add event listeners to like, edit and delete buttons
function attachEventListeners(container, movieId){
    const deleteButton = container.querySelector('.btn-danger');
    const editButton = container.querySelector('.btn-warning');
    const likeButton = container.querySelector('.btn-primary');

    if(deleteButton){
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            deleteMovie(movieId);
        })
    }

    if(likeButton){
        likeButton.addEventListener('click', (e) => {
            e.preventDefault();
            likeMovie(movieId);
        })
    }

    if(editButton){
        editButton.addEventListener('click', (e) => {
            e.preventDefault();
            renderEdit(movieId);
        })
    }
}


//self-explanation :D
function deleteMovie(movieId){
    
    const url = `http://localhost:3030/data/movies/${movieId}`;
    const token = getAccessToken();

    fetch(url, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    })
        .then(res => res.json())
        .then(data => {
            returnToHome();
        })
}

//self-explanation :D
async function likeMovie(movieId) {
    

    const user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    })

    showDetails(movieId)
}

//self-explanation :D
async function revokeLike(likeId){

    const url = `http://localhost:3030/data/likes/${likeId}`
    let token = getAccessToken();

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    })
}
