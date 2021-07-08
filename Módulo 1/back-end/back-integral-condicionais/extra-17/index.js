//valor do produto comprado.
const valorDoProduto = 100000;

//quantidade de parcelas
const quantidadeDoParcelamento = 10;

//valor pago
const valorPago = 300;

//parcelas restantes
const restam = valorPago === 0 ? quantidadeDoParcelamento : quantidadeDoParcelamento - (valorPago / (valorDoProduto / quantidadeDoParcelamento/100));


if(restam === 0){
    console.log("Você já pagou todas as parcelas")
}else{
    console.log(`Restam ${restam} parcelas de R$${(valorDoProduto / quantidadeDoParcelamento/100).toFixed(2)}`)
}
