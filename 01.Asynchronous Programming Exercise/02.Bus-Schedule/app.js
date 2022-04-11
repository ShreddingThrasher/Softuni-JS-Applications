function solve() {

    const infoSpanElement = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    
    let stop = {
        next: 'depot',
    }


    function depart() {

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        //make GET request
        fetch(url)
            .then(data => data.json())
            .then(data => {
                infoSpanElement.textContent = `Next stop ${data.name}`;
                stop = data;
            });

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {

        infoSpanElement.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();