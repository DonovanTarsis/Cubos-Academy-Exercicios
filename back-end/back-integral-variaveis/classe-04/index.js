const capital = 1000;
const taxaJuros = 12.5;
const tempo = 5;
const montante = (capital * ((1 + (taxaJuros/100)) ** tempo));
console.log(Math.trunc(montante))