const input = document.querySelector('#searchField');

export function search(){
    const tableRows = document.querySelector('.container tbody').children;

    let searchTerm = input.value;
    input.value = '';

    for (const row of tableRows) {
    
        row.classList.remove('select');

        if(row.textContent.toLowerCase().includes(searchTerm.toLowerCase())){
            row.classList.add('select');
        }
    }
}