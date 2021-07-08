const populacaoInfectInicial = 1000;
const taxaTransmissao = 4;
const tempo = 100
const totalInfect = populacaoInfectInicial * (taxaTransmissao ** (tempo/7));
console.log(Math.trunc(totalInfect));
