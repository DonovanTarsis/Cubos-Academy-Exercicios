const input = document.querySelector('input');
const lista = document.querySelectorAll('li');

input.addEventListener('keydown', function (event){
    if(event.code !== 'Enter'){
        return
    }
    lista.forEach( li => {
        li.classList.remove('escondido')
    })
    lista.forEach( li => {
        if(!event.target.value){
            li.classList.remove('escondido')
        }
        else if (event.target.value && li.textContent  !== event.target.value){
            li.classList.add('escondido')
        }
    })
    event.target.value = ''
})
