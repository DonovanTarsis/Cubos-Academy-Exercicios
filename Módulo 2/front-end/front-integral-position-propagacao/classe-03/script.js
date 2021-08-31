const imgs = document.querySelectorAll('.principal__imagens img');
const modal = document.querySelector('.modal');
const imgModal = document.querySelector('.modal img');

imgs.forEach(img => {
    img.addEventListener('click', (event) => {
        modal.style.display = 'flex'
        imgModal.src = event.target.src
    })
});
modal.addEventListener('click', () => {
    modal.style.display = 'none'
})
imgModal.addEventListener('click', (event) => {
    event.stopPropagation()
})