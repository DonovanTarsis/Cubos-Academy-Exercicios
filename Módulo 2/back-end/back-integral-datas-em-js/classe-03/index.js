const {set} = require('date-fns')
function taAberto (data){
    const clienteChega = +data;
    const abre = +set(data, {
        hours: 8,
        minutes: 0,
    });
    const fecha = +set(data, {
        hours: 18,
        minutes: 0,
    });;

    if(clienteChega >= abre && clienteChega <= fecha){
        return true
    }
    return false
}
console.log(taAberto(new Date(2015,1,1,7,59)))

