//renda mensal do aluno, em centavos.
const rendaMensalEmCentavos = 100000;

// Tempo decorrido de contrato. Se for maior que 60 meses, o aluno não deve mais nada.
const mesesDecorridos = 30;

// Soma das parcelas já pagas pelo aluno nos meses anteriores (em centavos). Se for igual a 18 mil reais, o aluno não deve pagar mais nada, pois já quitou a dívida.
const totalJaPagoPeloAluno = 1700000;


if(totalJaPagoPeloAluno >= 1800000){
    console.log("O valor da parcela desse mês é R$ 0 reais. Nenhum valor é devido pois a você já quitou a dívida.")
}else if(rendaMensalEmCentavos < 200000){
    console.log("O valor da parcela desse mês é R$ 0 reais. Nenhum valor é devido pois a renda do estudante está abaixo do valor mínimo de R$ 2000 reais.");
}else if(mesesDecorridos > 60){
    console.log("O valor da parcela desse mês é R$ 0 reais. Nenhum valor é devido pois já decorreu mais de 60 meses")
}else{
    const parcela = 1800000 - totalJaPagoPeloAluno < rendaMensalEmCentavos * 0.18 ? (1800000 - totalJaPagoPeloAluno) / 100 : (rendaMensalEmCentavos * 0.18) / 100;
    console.log(`O valor da parcela desse mês é R$ ${parcela.toFixed(2)} ${parcela === 1? "real" : "reais"}`)
}