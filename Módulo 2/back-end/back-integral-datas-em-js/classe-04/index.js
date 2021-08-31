const {set} = require('date-fns')
function taAberto (data){
    const diaDaSemana = data.getDay();
    const clienteChega = +data;
    const abre = +set(data, {
        hours: 8,
        minutes: 0,
    });
    const fecha = +set(data, {
        hours: 18,
        minutes: 0,
    });;

    if(diaDaSemana > 0 && diaDaSemana < 6 && clienteChega >= abre && clienteChega <= fecha){
        return true
    }
    return false
}

console.log(taAberto(new Date(2021,3,26,7,59)))
