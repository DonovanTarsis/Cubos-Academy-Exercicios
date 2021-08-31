const img = document.querySelector('img');
const input = document.querySelector('.card__password input')

img.addEventListener('click', (event) => {
    if(img.src.includes("/assets/olho-fechado.svg")){
        img.src = '/classe-01/assets/olho-aberto.svg'
        input.type = "text"
    }else{
        img.src = '/classe-01/assets/olho-fechado.svg'
        input.type = "password"
    }
})
