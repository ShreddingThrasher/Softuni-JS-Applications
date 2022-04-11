function attachEvents() {
    
    const url = `http://localhost:3030/jsonstore/phonebook`;

    const phonebookElement = document.getElementById('phonebook');

    const loadButtonElement = document.getElementById('btnLoad');
    const createButtonElement = document.getElementById('btnCreate');

    loadButtonElement.addEventListener('click', loadPhonebook)
    createButtonElement.addEventListener('click', createPhoneRecord);

    //loads all available phone records from the server as HTML elements
    function loadPhonebook(){

        fetch(url)
            .then(res => res.json())
            .then(data => {
                
                //clear elements from the previous request
                phonebookElement.innerHTML = '';

                //add li element for each phone record from the server response
                for (const p of Object.values(data)) {
                    
                    let liElement = document.createElement('li');
                    liElement.textContent = `${p.person}: ${p.phone}`;

                    let deleteButton = document.createElement('button');
                    deleteButton.id = p._id;
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', deletePhoneRecord);

                    liElement.appendChild(deleteButton);
                    phonebookElement.appendChild(liElement);
                }
            })
    }

    //create new phone record
    function createPhoneRecord(){

        let personInput = document.getElementById('person');
        let phoneInput = document.getElementById('phone');

        let phoneRecordObj = {
            person: personInput.value,
            phone: phoneInput.value
        }

        //send POST request to create a new phone record on the server
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(phoneRecordObj)
        })
            .then(res => res.json())
            .then(data => {
                
                //clear input fields and refresh the phonebook element
                personInput.value = '';
                phoneInput.value = '';
                loadButtonElement.click();
            })
    }

    //delete the phone from the server and the HTML document
    function deletePhoneRecord(ev){

        //delete the phone record from the server
        fetch(`${url}/${ev.target.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(x => {
                
                //remove the phone element from the HTML document
                //after successfull delete request
                ev.target.parentNode.remove();
            })
    }
}

attachEvents();