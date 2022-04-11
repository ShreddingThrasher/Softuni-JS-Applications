function solution() {

    const main = document.getElementById('main');
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    //make GET request for the list of articles
    fetch(url)
        .then(data => data.json())
        .then(data => {

            //create elements for each article from the response
            data.forEach(element => {
                
                let accordionDivElement = createElement('div', '', ['class', 'accordion']);

                let headDivElement = createElement('div', '', ['class', 'head']);

                let titleSpanElement = createElement('span', element.title);
                let buttonElement = createElement('button', 'More', ['class', 'button', 'id', element._id]);
                buttonElement.addEventListener('click', buttonClick);

                headDivElement.appendChild(titleSpanElement);
                headDivElement.appendChild(buttonElement);
                accordionDivElement.appendChild(headDivElement);

                let extraDivElement = createElement('div', '', ['class', 'extra']);
                let contentElement = createElement('p', '');

                extraDivElement.appendChild(contentElement);
                accordionDivElement.appendChild(extraDivElement);

                main.appendChild(accordionDivElement);
            });
        });

    //button click function to show more or hide the information
    function buttonClick(ev){
        
        //check the current state of the button
        if(ev.target.textContent === 'More'){
            
            ev.target.textContent = 'Less';

            //get the ID of the current article
            let id = ev.target.id;
        
            const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

            //make GET request to get the current article content
            fetch(url)
                .then(data => data.json())
                .then(data => {

                    //Get the current article P element and set it's content
                    //to be the content from the response and make it visible
                    ev.target.parentNode.nextSibling.querySelector('p').textContent = data.content;
                    ev.target.parentNode.nextSibling.style.display = 'block';
                })

        } else{

            //hide the article content
            ev.target.textContent = 'More';
            ev.target.parentNode.nextSibling.style.display = 'none';
        }
    }

    //custom function to create DOM element
    function createElement(type, content, attributes = []){

        const element = document.createElement(type);

        if(content){
            element.textContent = content;
        }

        if(attributes.length > 0){

            for(let i = 0; i < attributes.length; i+=2){
                element.setAttribute(attributes[i], attributes[i + 1])
            }
        }

        return element
    }
}
solution();