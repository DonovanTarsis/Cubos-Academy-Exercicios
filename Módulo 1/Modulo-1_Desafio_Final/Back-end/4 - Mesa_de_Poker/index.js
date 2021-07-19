function solucao(min, max, valores) {
  const valorespermitidos = valores.filter(x => x >= min && x <= max ? true : false);
  console.log(valorespermitidos);
}


const min = 2;
const max = 10;
const valores = [0,5,6,10,11]

solucao(min, max, valores);