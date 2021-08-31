const btn = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const btnModal = document.querySelectorAll('.modal');
const confirmar = document.querySelector('.confirmar');

btnModal.forEach(button => {
    button.addEventListener('click', function(event){
        modal.classList.add('escondido')
    })
})

confirmar.addEventListener('click', function(){
    btn.addEventListener('click', inscrever);
    btn.classList.remove('inscrito');
    btn.textContent ='INSCREVER-SE'
})

btn.addEventListener('click', inscrever);

function inscrever (event){
    event.target.classList.add('inscrito');
    event.target.textContent = "INSCRITO";
    event.target.removeEventListener('click', inscrever);
    btn.addEventListener('click', function (){
        modal.classList.remove('escondido');
    })
}
