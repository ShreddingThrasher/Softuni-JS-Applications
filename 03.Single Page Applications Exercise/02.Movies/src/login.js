import { updateAuth } from "./auth.js";
import { hideAll, returnToHome } from "./util.js";

const section = document.getElementById('form-login');
const formElement = section.querySelector('form');

//login form submit handler
formElement.addEventListener('submit', (e) => {

    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let email = formData.get('email');
    let password = formData.get('password');

    if(!email || !password){
        return alert('Please fill all fields');
    }

    const url = 'http://localhost:3030/users/login';

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(res => res.json())
        .then(user => {

            formElement.reset();

            if(!user.accessToken){
                return alert(user.message);
            }

            localStorage.setItem('user', JSON.stringify(user));

            updateAuth();
            hideAll();
            returnToHome();
        })
})

export function renderLogin(){
    section.style.display = 'block';
}
