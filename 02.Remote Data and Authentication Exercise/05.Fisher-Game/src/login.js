
window.addEventListener('load', () => {
    if(localStorage.getItem('email')){
        document.getElementById('guest').style.display = 'none';
    } else{
        document.getElementById('user').style.display = 'none';
    }
})

const formElement = document.querySelector('form');

const url = 'http://localhost:3030/users/login';

formElement.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let formData = new FormData(ev.target);
    
    let email = formData.get('email');
    let password = formData.get('password');

    if(!email || !password){
        alert('Please fill the fields');
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(res => res.json())
        .catch(() => loginError())
        .then(user => {

            if(!user.accessToken){
                loginError();
                return;
            }
            localStorage.setItem('email', user.email);
            localStorage.setItem('_id', user._id);
            localStorage.setItem('accessToken', user.accessToken);

            window.location = './index.html';
        })
})

function loginError(){
    formElement.reset();
    return alert(`The account doesn't exist.`);
}