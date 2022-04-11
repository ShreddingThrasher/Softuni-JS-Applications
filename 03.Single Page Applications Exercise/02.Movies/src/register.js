import { updateAuth } from "./auth.js";
import { hideAll, returnToHome } from "./util.js";

const section = document.getElementById('form-sign-up');
const formElement = section.querySelector('form');

//register form submit handler
formElement.addEventListener('submit', (e) => {

    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let email = formData.get('email');
    let password = formData.get('password');
    let repeat = formData.get('repeatPassword')

    if(!email || !password || !repeat){
        return alert('please fill all fields.');
    }

    if(password.length < 6){
        return alert('password should be at least 6 characters long.');
    }

    if(password !== repeat){
        return alert(`Password doesn't match.`);
    }

    const url = 'http://localhost:3030/users/register';

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

            //in case user already exists
            if(!user.accessToken){
                return alert(user.message);
            }

            localStorage.setItem('user', JSON.stringify(user));
            updateAuth();
            hideAll();
            returnToHome();
        })
})

export function renderRegister(){
    section.style.display = 'block';
}
