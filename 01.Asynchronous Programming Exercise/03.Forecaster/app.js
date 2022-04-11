function attachEvents() {
    
    const locationInputElement = document.getElementById('location');
    const submitButtonElement = document.getElementById('submit');
    const forecastDivElement = document.getElementById('forecast');

    submitButtonElement.addEventListener('click', submitButtonClick);

    const url = `http://localhost:3030/jsonstore/forecaster/locations`;

    function submitButtonClick(){

        //clear the elements from the previous request
        clearPreviousElements();


        //new request for the current input
        fetch(url)
            .then(data => data.json())
            .catch(() => errorFunction())
            .then(data => {

                const location = data.find(l => l.name === locationInputElement.value);
                locationInputElement.value = '';
                return location; 
            })
            .catch(() => errorFunction())
            .then(location => {

                //URLs for current conditon and upcoming condition
                const currCondUrl = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`;
                const upcomingCondUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`;

                fetch(currCondUrl)
                    .then(data => data.json())
                    .then(data => {

                        //create current section elements
                        forecastDivElement.style.display = 'block';
                        createCurrentSectionElements(data);

                    })

                fetch(upcomingCondUrl)
                    .then(data => data.json())
                    .then(data => {

                        //create upcoming section elements
                        createUpcomingSectionElements(data);
                    })
            })
            .catch(() => errorFunction());
    }

    function clearPreviousElements(){

        let currentSection = forecastDivElement.querySelector('#current');

        if(currentSection.children.length > 1){

            for(let i = currentSection.children.length - 1; i > 0; i--){
                currentSection.children[i].remove();
            }
        }

        let upcomingSection = forecastDivElement.querySelector('#upcoming');

        if(upcomingSection.children.length > 1){

            for(let i = upcomingSection.children.length - 1; i > 0; i--){
                upcomingSection.children[i].remove();
            }
        }
    }

    function createCurrentSectionElements(data){

        let symbolSpanElement = document.createElement('span');
        symbolSpanElement.innerHTML = getConditionSymbol(data.forecast.condition);
        symbolSpanElement.className = 'condition symbol';

        let conditionSpanElement = document.createElement('span');

        let firstDataSpanElement = document.createElement('span');
        firstDataSpanElement.textContent = data.name;
        firstDataSpanElement.className = 'forecast-data';
        conditionSpanElement.appendChild(firstDataSpanElement);

        let secondDataSpanElement = document.createElement('span');
        secondDataSpanElement.innerHTML = `${data.forecast.low}&deg;/${data.forecast.high}&deg;`
        secondDataSpanElement.className = 'forecast-data';
        conditionSpanElement.appendChild(secondDataSpanElement);

        let thirdDataSpanElement = document.createElement('span');
        thirdDataSpanElement.textContent = data.forecast.condition;
        thirdDataSpanElement.className = 'forecast-data';
        conditionSpanElement.appendChild(thirdDataSpanElement);

        forecastDivElement.querySelector('#current').appendChild(symbolSpanElement);
        forecastDivElement.querySelector('#current').appendChild(conditionSpanElement);
    }

    function createUpcomingSectionElements(data){

        data.forecast.forEach(element => {
            
            let upcomingSpanElement = document.createElement('span');
            upcomingSpanElement.className = 'upcoming';

            let spanSymbolElement = document.createElement('span');
            spanSymbolElement.innerHTML = getConditionSymbol(element.condition);
            spanSymbolElement.className = 'symbol';
            upcomingSpanElement.appendChild(spanSymbolElement);

            let firstDataElement = document.createElement('span');
            firstDataElement.innerHTML = `${element.low}&deg;/${element.high}&deg;`;
            firstDataElement.className = 'forecast-data';
            upcomingSpanElement.appendChild(firstDataElement);

            let secondDataElement = document.createElement('span');
            secondDataElement.textContent = element.condition;
            secondDataElement.className = 'forecast-data';
            upcomingSpanElement.appendChild(secondDataElement);

            forecastDivElement.querySelector('#upcoming').appendChild(upcomingSpanElement);
        });
    }

    //function to get the code for a given condition symbol
    function getConditionSymbol(condition){

        switch(condition){
            case 'Sunny': 
                return '&#x2600';
                break;
            case 'Partly sunny':
                return '&#x26C5';
                break;
            case 'Overcast': 
                return '&#x2601';
                break;
            case 'Rain':
                return '&#x2614';
                break;
        }
    }

    //in case of error change the contents of the page
    //the page must be reloaded to work correctly
    function errorFunction(){

        forecastDivElement.style.display = 'block';
        forecastDivElement.querySelector('.label').textContent = 'Error';
        forecastDivElement.querySelector('#upcoming').remove();

        let messageElement = document.createElement('p');
        messageElement.textContent = 'Please refresh the page :)';
        forecastDivElement.querySelector('#current').appendChild(messageElement);
    }
}

attachEvents();