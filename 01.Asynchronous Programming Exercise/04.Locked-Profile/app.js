function lockedProfile() {
    
    const mainSection = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    let profileCounter = 1;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            for (const key of Object.keys(data)) {

                //create profive div element for each profile from the response
                createProfileElement(data[key])
            }
        })
        

    //create new profile div element and it's children
    function createProfileElement(profileJSON){

        let profileDivElement = document.createElement('div');
        profileDivElement.className = 'profile';

        let imgElement = document.createElement('img');
        imgElement.className = 'userIcon';
        imgElement.src = './iconProfile2.png';
        profileDivElement.appendChild(imgElement);

        let lockLabelElement = document.createElement('label');
        lockLabelElement.textContent = 'Lock';
        profileDivElement.appendChild(lockLabelElement);
        profileDivElement.innerHTML += '\n';

        let lockRadioElement = document.createElement('input');
        lockRadioElement.type = 'radio';
        lockRadioElement.name = `user${profileCounter}Locked`;
        lockRadioElement.value = 'lock';
        lockRadioElement.setAttribute('checked', 'true');
        profileDivElement.appendChild(lockRadioElement);
        profileDivElement.innerHTML += '\n';

        let unlockLabel = document.createElement('label');
        unlockLabel.textContent = 'Unlock';
        profileDivElement.appendChild(unlockLabel);
        profileDivElement.innerHTML += '\n';

        let unlockRadioElement = document.createElement('input');
        unlockRadioElement.type = 'radio';
        unlockRadioElement.name = `user${profileCounter}Locked`;
        unlockRadioElement.value = 'unlock';
        profileDivElement.appendChild(unlockRadioElement);

        let brElement = document.createElement('br');
        profileDivElement.appendChild(brElement);

        let hrElement = document.createElement('hr');
        profileDivElement.appendChild(hrElement);

        let usernameLabelElement = document.createElement('label');
        usernameLabelElement.textContent = 'Username';
        profileDivElement.appendChild(usernameLabelElement);

        let usernameInputElement = document.createElement('input');
        usernameInputElement.type = 'text';
        usernameInputElement.name = `user${profileCounter}Username`;
        usernameInputElement.value = profileJSON.username;
        usernameInputElement.disabled = true;
        usernameInputElement.readOnly = true;
        profileDivElement.appendChild(usernameInputElement);

        let hiddenFieldsDiv = document.createElement('div');
        hiddenFieldsDiv.id = `user${profileCounter}HiddenFields`;
        hiddenFieldsDiv.style.display = 'none';

        let hrElementHidden = document.createElement('hr');
        hiddenFieldsDiv.appendChild(hrElementHidden);

        let emailLabelElement = document.createElement('label');
        emailLabelElement.textContent = 'Email: ';
        hiddenFieldsDiv.appendChild(emailLabelElement);

        let emailInputElement = document.createElement('input');
        emailInputElement.type = 'email';
        emailInputElement.name = `user${profileCounter}Email`;
        emailInputElement.value = profileJSON.email;
        emailInputElement.disabled = true;
        emailInputElement.readOnly = true;
        hiddenFieldsDiv.appendChild(emailInputElement);


        //wasn't shown in the sample structure,
        //but without it the hidden div looks broken in my screen resolution
        //uncomment the line below if using larger than 1980x1080 resolution
        //hiddenFieldsDiv.appendChild(document.createElement('br'));

        let ageLabelElement = document.createElement('label');
        ageLabelElement.textContent = 'Age: ';
        hiddenFieldsDiv.appendChild(ageLabelElement);

        let ageInputElement = document.createElement('input');
        ageInputElement.type = 'email';
        ageInputElement.name = `user${profileCounter}Age`;
        ageInputElement.value = profileJSON.age;
        ageInputElement.disabled = true;
        ageInputElement.readOnly = true;
        hiddenFieldsDiv.appendChild(ageInputElement);

        profileDivElement.appendChild(hiddenFieldsDiv);

        let buttonElement = document.createElement('button');
        buttonElement.textContent = 'Show more';
        buttonElement.addEventListener('click', showMoreButtonClick);
        profileDivElement.appendChild(buttonElement);

        mainSection.appendChild(profileDivElement);
        profileCounter++;
        
        
    }

    //show|hide the profile information
    function showMoreButtonClick(ev){
        
        const profile = ev.target.parentNode;

        if(profile.children[2].checked){
            return;
        }

        if(ev.target.textContent === 'Show more'){

            profile.children[9].style.display = 'block';
            ev.target.textContent = 'Hide it';

        } else{
            
            profile.children[9].style.display = 'none';
            ev.target.textContent = 'Show more';
        }
    }
}