function taValendo (inicio, cliente){
    const inicia  = +inicio
    const termina = +inicio.setDate(inicio.getDate()+30)
    console.log(inicia);
    console.log(termina);

    if(+cliente >= inicia && +cliente < termina){
        return true
    }
    return false
}

console.log(taValendo(new Date(2021,3,1,9,30), new Date(2021,4,2,9,29)))
