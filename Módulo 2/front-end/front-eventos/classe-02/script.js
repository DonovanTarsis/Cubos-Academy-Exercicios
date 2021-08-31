const listaInput = document.querySelectorAll('input');

listaInput.forEach(input => {
    addEventListener('change', function(event) {
        if(event.target.value === event.target.dataset.resposta){
            event.target.classList.add('acerto')
        }
        else{
            event.target.classList.remove('acerto')
        }
    })
})