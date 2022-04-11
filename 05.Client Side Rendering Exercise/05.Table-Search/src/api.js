const url = `http://localhost:3030/jsonstore/advanced/table`;

export function getAllStudents(){
    return fetch(url)
            .then(res => res.json());
}