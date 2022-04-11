const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

export function getAllOptionItems(){
    return fetch(url)
        .then(res => res.json());
}

export function addOption(text){
    return fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({text})
        })
            .then(res => res.json())
}