
window.addEventListener('load', () => {
    if(localStorage.getItem('email')){
        document.getElementById('guest').style.display = 'none';
    } else{
        document.getElementById('user').style.display = 'none';
    }
})

const formElement = document.querySelector('form');
const url = 'http://localhost:3030/users/register';

formElement.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let repeat = formData.get('rePass');

    if(!email || !password || !repeat){
        return alert('Please fill the fields.');
    }

    if(password !== repeat){
        return alert(`Password doesn't match.`);
    }

    let user = {
        email,
        password
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {

            if(!data.accessToken){

                return alert(data.message);
            }

            localStorage.setItem('email', data.email);
            localStorage.setItem('_id', data._id);
            localStorage.setItem('accessToken', data.accessToken);

            window.location = './index.html';
        })
})