const sections = document.querySelectorAll('section')

export function hideAll(){
    sections.forEach(s => s.style.display = 'none');
}
