const estado = document.querySelector('select');
const senha = document.querySelector('#senha');
const repeatSenha = document.querySelector('#senha-repeat');
const formulario = document.querySelector('form');


formulario.addEventListener('submit', (event) => {
    if(senha.value !== repeatSenha.value || estado.value === "Selecionar"){
        event.preventDefault()
    }

    if(senha.value !== repeatSenha.value){
        repeatSenha.classList.add('preencher')
    }else{
        repeatSenha.classList.remove('preencher')
    }
    
    if(estado.value === "Selecionar"){
        estado.classList.add('preencher')
    }else{
        estado.classList.remove('preencher')
    }
})