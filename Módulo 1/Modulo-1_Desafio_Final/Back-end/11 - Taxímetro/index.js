function solucao(min, km) {
    const valorBase = (tempo, distancia) => {
        return tempo * 50 + 70 * distancia
    };
    let total
    if(min > 20 && km > 10){
        total = Math.floor(valorBase(20, 10) + ((min - 20) * 30) + ((km - 10) * 50));
    }else if(min > 20){
        total = Math.floor(valorBase(20, km) + ((min - 20) * 30));
    }else if(km > 10){
        total = Math.floor(valorBase(min, 10) + ((km - 10) * 50));
    }else{
        total = Math.floor(valorBase(min, km));
    }console.log(total);
}

const min = 25
const km = 11.5

solucao(min,km)