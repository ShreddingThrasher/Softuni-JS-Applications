const viewSections = Array.from(document.getElementsByClassName('view-section'));

export function hideAll(){
    viewSections.forEach(s => s.style.display = 'none');
}


export function checkLogged(){
    return localStorage.getItem('user');
}

//checks if the current user is the owner of the movie
export function checkOwner(serializedUser, movieId){
    let userId = JSON.parse(serializedUser)._id;
    return userId === movieId;
}


//used to return to home after login, register, edit...
export function returnToHome(){
    document.querySelector('nav a').click();
}