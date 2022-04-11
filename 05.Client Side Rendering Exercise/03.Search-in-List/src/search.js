const inputElement = document.querySelector('#searchText')
const resultSection = document.querySelector('#result')

export function search() {

    const townsLiElements = document.querySelectorAll('#towns ul li');
    let searchTerm = inputElement.value;
    inputElement.value = '';

    let matches = 0;
    resultSection.textContent = '';

    for (const li of townsLiElements) {

        li.classList.remove('active');
        
        if(li.textContent.toLowerCase().includes(searchTerm.toLowerCase())){
            li.classList.add('active');
            matches++;
        }
    }

    resultSection.textContent = `${matches} matches found`;
}
