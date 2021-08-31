function taValendo (inicio, cliente){
    const inicia  = +inicio
    const termina = +inicio.setHours(inicio.getHours()+24)
    console.log(inicia);
    console.log(termina);

    if(+cliente >= inicia && +cliente < termina){
        return true
    }
    return false
}

console.log(taValendo(new Date(2021,3,24,9,30), new Date(2021,3,25,9,29)))
