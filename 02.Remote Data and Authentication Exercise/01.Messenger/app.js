function attachEvents() {
    
    const url = 'http://localhost:3030/jsonstore/messenger';

    const submitButtonElement = document.getElementById('submit');
    const refreshButtonElement = document.getElementById('refresh');

    const messagesArea = document.getElementById('messages');
    const controlsSection = document.getElementById('controls')

    submitButtonElement.addEventListener('click', submitMessage);
    refreshButtonElement.addEventListener('click', refreshMessages);

    //submits new message
    function submitMessage(){
        
        let authorInput = controlsSection.getElementsByTagName('input')[0];
        let messageInput = controlsSection.getElementsByTagName('input')[1];

        let author = authorInput.value;
        let content = messageInput.value;

        let messageObj = {
            author,
            content
        }

        //send POST request to create a new message record on the server
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(messageObj)
        })

            .then(res => res.json())
            .then(data => {
                
                //clear input fields
                authorInput.value = '';
                messageInput.value = '';
            })
    }

    //refresh the value of the textarea with current message records
    function refreshMessages(){

        fetch(url)
            .then(res => res.json())
            .then(data => {

                //clear data from previous request
                messagesArea.value = '';
                
                //loads all messages from the server resonse
                for (const message of Object.values(data)) {

                    messagesArea.value += `${message.author}: ${message.content}\n`;
                }
            })
    }
}

attachEvents();