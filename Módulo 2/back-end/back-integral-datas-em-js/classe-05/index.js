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
    });
    const fechaSabado = +set(data, {
        hours: 12,
        minutes: 0,
    });

    if(diaDaSemana > 0 && diaDaSemana < 6 && clienteChega >= abre && clienteChega <= fecha){
        return true
    }
    if(diaDaSemana === 6 && clienteChega >= abre && clienteChega <= fechaSabado){
        return true
    }
    return false
}

console.log(taAberto(new Date(2021,3,24,9,30)))