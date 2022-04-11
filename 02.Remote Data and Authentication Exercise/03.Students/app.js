
const resultsTable = document.getElementById('results').querySelector('tbody');
const formElement = document.querySelector('form');

const url = 'http://localhost:3030/jsonstore/collections/students';

window.addEventListener('load', extractStudents);

//add new student record
formElement.addEventListener('submit', async (ev) => {
    
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    firstName = formData.get('firstName');
    lastName = formData.get('lastName');
    facultyNumber = formData.get('facultyNumber');
    grade = Number(formData.get('grade'));


    //check if all input fields are correct
    if(!firstName || !lastName || !Number(facultyNumber) || !Number(grade)){
        return alert('invalid input.')
    }

    //create new student obj
    let studentObj = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        facultyNumber: formData.get('facultyNumber'),
        grade: Number(formData.get('grade'))
    }

    await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(studentObj)
    });

    formElement.reset();
    window.location.reload();
})

//get data for student records and render them in the tbody element
function extractStudents(){

    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        for (const student of Object.values(data)) {

            let trElement = document.createElement('tr');

            let fnameElement = document.createElement('td');
            fnameElement.textContent = student.firstName;
            trElement.appendChild(fnameElement);

            let lnameElement = document.createElement('td');
            lnameElement.textContent = student.lastName;
            trElement.appendChild(lnameElement);

            let facultyNumElement = document.createElement('td');
            facultyNumElement.textContent = student.facultyNumber;
            trElement.appendChild(facultyNumElement);

            let gradeElement = document.createElement('td');
            gradeElement.textContent = student.grade;
            trElement.appendChild(gradeElement);

            resultsTable.appendChild(trElement)
        }
    })

}