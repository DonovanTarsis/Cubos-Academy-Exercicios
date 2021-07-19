function solucao(lista) {
    const total = lista.reduce((acc, cur) => acc += cur) / lista.length;
    console.log(total);
}

const entrada = [2, 3, 4];
solucao(entrada)