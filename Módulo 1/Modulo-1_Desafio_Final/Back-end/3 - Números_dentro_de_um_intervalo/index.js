function solucao(numero, limiteInferior, limiteSuperior) {
    if (numero >= limiteInferior && numero <= limiteSuperior){
        console.log("PERTENCE");
    }else{
        console.log("NAO PERTENCE");
    }
}

const numero = 10;
const limiteInferior = 5;
const limiteSuperior = 20;
solucao(numero, limiteInferior, limiteSuperior)