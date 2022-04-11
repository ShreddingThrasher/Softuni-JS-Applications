import { showDetails } from "./details.js";
import { checkLogged } from "./util.js";

const homeSection = document.getElementById('home-page');
const moviesContainer = homeSection.querySelector('#movie .card-deck.d-flex.justify-content-center');

export function renderHome(){
    homeSection.style.display = 'block';
    updateHome();
}

//updates the home page content
function updateHome(){

    moviesContainer.innerHTML = '';
    renderAllMovies(moviesContainer);
}

async function renderAllMovies(section){

    let moviesData = await getMoviesData();

    for (const movie of moviesData) {
        section.appendChild(createMovieElement(movie));
    }
}

function createMovieElement(movie){

    let disable = !checkLogged() ? 'style="pointer-events: none"' : '';

    const movieElement = document.createElement('div');
    movieElement.className = 'card mb-4';

    movieElement.innerHTML = `
        <img class="card-img-top"
            src="${movie.img}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href="/details/${movie._id}" id="${movie._id}" ${disable}>
                <button type="button" class="btn btn-info">Details</button>
            </a>
        </div>`;

    movieElement.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let movieId = e.currentTarget.id;

        showDetails(movieId);
    })

    return movieElement;
}

async function getMoviesData(){

    const res = await fetch('http://localhost:3030/data/movies');
    const data = await res.json();

    return data;
}