import { router } from './router.js';
import { updateAuth } from './auth.js';
import { renderHome } from './home.js';

updateAuth();
renderHome();


//add events to nav anchors
const navigationElement = document.querySelector('#navigation');
navigationElement.addEventListener('click', (e) => {

    e.preventDefault();

    if(e.target.tagName === 'A'){

        let url = new URL(e.target.href);
        router(url.pathname);
    }
})

//add event to add movie anchor
document.querySelector('#add-movie-button a').addEventListener('click', (e) => {

    e.preventDefault();

    let url = new URL(e.target.href);
    router(url.pathname);
});
