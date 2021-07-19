function solucao(lista) {
    const total = lista.reduce((acc, cur) => acc += cur);
    console.log(total);
}


const entrada = [1,2,3,4];
solucao(entrada);