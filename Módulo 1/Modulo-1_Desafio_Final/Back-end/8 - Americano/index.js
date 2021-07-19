function solucao(numeros) {
    const total = numeros.reduce((acc, cur) => acc += cur);

    if(total % numeros.length !== 0){
        console.log(total % numeros.length);
    }else{
        console.log(numeros.length)
    }
}

const numeros = [1,3,2,1]
solucao(numeros)