function getInfo() {
    
    const stopIdInput = document.getElementById('stopId');
    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo/';

    const stopNameElement = document.getElementById('stopName');
    const busesUlElement = document.getElementById('buses');

    //make GET request
    fetch(baseUrl + stopIdInput.value)
        .then(data => data.json())
        .catch(() => stopNameElement.textContent = 'Error')
        .then(data => {

            //clear current data from HTML elements
            stopNameElement.textContent = '';
            busesUlElement.innerHTML = '';
            stopIdInput.value = '';

            //Show the requested stop name
            stopNameElement.textContent = data.name;

            //append the info for each bus as li elements
            for (const bus of Object.keys(data.buses)) {
                
                let liElement = document.createElement('li');
                liElement.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
                busesUlElement.appendChild(liElement);
            }
        })
        .catch(() => stopNameElement.textContent = 'Error');
}