
window.addEventListener('load', () => {

    //check if someone is logged in
    if(localStorage.getItem('email')){

        document.getElementById('guest').style.display = 'none';
        document.querySelector('.email').querySelector('span').textContent = localStorage.getItem('email');
        document.querySelector('.add').disabled = false;
        
    } else{

        document.getElementById('user').style.display = 'none';

        let buttons = document.getElementsByTagName('button');
        for (const btn of buttons) {
            if(btn.textContent !== 'Load'){
                btn.disabled = true;
            }
        }

    }

    loadCatches();

    //logout button click event handler
    document.getElementById('logout').addEventListener('click', () => {
        const url = 'http://localhost:3030/users/logout';

        fetch(url, {
            headers: {
                'X-Authorization': localStorage.getItem('accessToken')
            }
        })
            .then(() => {
                localStorage.clear();
                window.location = './index.html'
            });
    })

    document.querySelector('.load').addEventListener('click', loadCatches);
    document.querySelector('#addForm button').addEventListener('click', addCatch);
})

//loads all catches in the Catches section
function loadCatches(){

    const catchesElement = document.getElementById('catches');
    catchesElement.innerHTML = '';

    const url = 'http://localhost:3030/data/catches';

    //request for the catches data from the server
    fetch(url)
        .then(res => res.json())
        .then(data => {

            //create elements for each catch from the server response
            for (const key in data) {
                let divElement = document.createElement('div');
                divElement.className = 'catch';

                let anglerLabel = createCustomElement('label', 'Angler');
                let anglerInput = createCustomElement('input', 'angler', data[key].angler);
                let weightLabel = createCustomElement('label', 'Weight');
                let weightInput = createCustomElement('input', 'weight', data[key].weight);
                let speciesLabel = createCustomElement('label', 'Species');
                let speciesInput = createCustomElement('input', 'species', data[key].species);
                let locationLabel = createCustomElement('label', 'Location');
                let locationInput = createCustomElement('input', 'location', data[key].location);
                let baitLabel = createCustomElement('label', 'Bait');
                let baitInput = createCustomElement('input', 'bait', data[key].bait);
                let captureLabel = createCustomElement('label', 'Capture Time');
                let captureInput = createCustomElement('input', 'captureTime', data[key].captureTime);

                let updateButton = createButtonElement('update', key, updateCatch);
                updateButton.textContent = 'Update';
                updateButton.id = data[key]._id;

                let deleteButton = createButtonElement('delete', key, deleteCatch);
                deleteButton.textContent = 'Delete';
                deleteButton.id = data[key]._id;

                //check if this catch belongs to the current user
                //If not - both update and delete buttons become disabled
                if(localStorage.getItem('_id') !== data[key]._ownerId){

                    updateButton.disabled = true;
                    deleteButton.disabled = true;
                }

                divElement.appendChild(anglerLabel);
                divElement.appendChild(anglerInput);
                divElement.appendChild(weightLabel);
                divElement.appendChild(weightInput);
                divElement.appendChild(speciesLabel);
                divElement.appendChild(speciesInput);
                divElement.appendChild(locationLabel);
                divElement.appendChild(locationInput);
                divElement.appendChild(baitLabel);
                divElement.appendChild(baitInput);
                divElement.appendChild(captureLabel);
                divElement.appendChild(captureInput);
                divElement.appendChild(updateButton);
                divElement.appendChild(deleteButton);
                
                catchesElement.appendChild(divElement);
            }
        })
}

//custom function to create elements
//could've been done better, but due to short time had to leave it this way
function createCustomElement(tag, _class, _value){

    if(tag === 'label'){
        let label = document.createElement('label')
        label.textContent = _class;
        
        return label;
    }

    let element = document.createElement(tag);
    element.className = _class;
    element.value = _value;

    return element;
}

//custom function to create button element
function createButtonElement(_class, id, eventHandler){
    
    let button = document.createElement('button');
    button.className = _class;
    button.name = _class;
    button.id = id;
    button.addEventListener('click', eventHandler);
    
    return button;
}

//adds new catch
function addCatch(ev){

    ev.preventDefault();

    const formElement = document.getElementById('addForm');
    const formData = new FormData(formElement);

    let angler = formData.get('angler');
    let weight = formData.get('weight');
    let species = formData.get('species');
    let location = formData.get('location');
    let bait = formData.get('bait');
    let captureTime = formData.get('captureTime');

    //check for empty form inputs
    if(!angler || !weight || !species || !location || !bait || !captureTime){
        return alert('Please fill all fields!');
    }

    let catchObj = {
        _ownerId: localStorage.getItem('_id'),
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    }

    const url = 'http://localhost:3030/data/catches/';

    //authorized request to create a new catch
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(catchObj)
    })
        .then(res => res.json())
        .then(() => {
            //clear the form and reload the page
            formElement.reset();
            window.location.reload();
        })

}

//updates the selected catch
function updateCatch(ev){

    const url = 'http://localhost:3030/data/catches/';

    let currCatch = ev.target.parentNode;

    let angler = currCatch.children[1].value;
    let weight = currCatch.children[3].value;
    let species = currCatch.children[5].value;
    let location = currCatch.children[7].value;
    let bait = currCatch.children[9].value;
    let captureTime = currCatch.children[11].value;

    if(!angler || !weight || !species || !location || !bait || !captureTime){
        return alert("Can't update with empty fields.");
    }

    let catchUpdateObj = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    }

    fetch(url + ev.target.id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify(catchUpdateObj)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}

//send delete request to delete the catch with given id
function deleteCatch(ev){
    
    const url = 'http://localhost:3030/data/catches/';

    fetch(url + ev.target.id, {
        method: 'DELETE',
        headers: {
            'X-Authorization': localStorage.getItem('accessToken')
        }
    })
        .then(() => {
            document.querySelector('.load').click();
        })
}
