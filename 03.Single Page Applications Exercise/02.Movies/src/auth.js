
const guestNav = document.getElementById('guest');
const userNav = document.getElementById('user');
const welcomeMsg = userNav.querySelector('#welcome-message');

//updates the navbar and add button if user is logged or not
export function updateAuth(){

    let serializedUser = localStorage.getItem('user');

    if(serializedUser){

        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
        welcomeMsg.textContent = `Welcome, ${JSON.parse(serializedUser).email}`;
        document.querySelector('#add-movie-button a').style.pointerEvents = 'auto';

    } else{

        guestNav.style.display = 'inline';
        userNav.style.display = 'none';
        document.querySelector('#add-movie-button a').style.pointerEvents = 'none';
    }
}

//returns accessToken from the local storages
export function getAccessToken(){
    return JSON.parse(localStorage.getItem('user')).accessToken;
}
