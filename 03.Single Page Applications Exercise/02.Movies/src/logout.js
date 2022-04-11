
import { updateAuth, getAccessToken } from "./auth.js";
import { returnToHome } from "./util.js";

export function renderLogout(){
    logout();
}

//logout function
function logout(){
    
    const url = 'http://localhost:3030/users/logout';
    let accessToken = getAccessToken();

    fetch(url, {
        headers: {
            'X-Authorization': accessToken
        }
    })
        .then(() => {
            localStorage.clear();
            updateAuth();
            returnToHome();
        })
}