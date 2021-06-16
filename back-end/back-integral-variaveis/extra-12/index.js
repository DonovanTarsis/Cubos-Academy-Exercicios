const capital = 60_000;
const montante = 90_000;
const periodos = 24;
const taxaJuros = ((montante / capital) ** (1 / periodos) -1 ) * 100;
console.log(`O seu financiamento de ${capital} reais teve uma taxa de juros de ${taxaJuros.toFixed(2)}%, pois após ${periodos} meses você teve que pagar ${montante} reais.`);
