const modal = document.querySelector('.modal');
const help = document.querySelector('.help')
help.addEventListener('click', () => {
    modal.classList.toggle('escondido')
})
modal.addEventListener('click', (event) => {
    event.stopPropagation();
})