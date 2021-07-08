const frutas = ['Banana', 'Maçã', 'Abacaxi', 'Pêra', 'Uva'];
let frutasReverse = frutas.reverse().join(", ");
console.log(frutasReverse);
let frutasNew = frutas.reverse().slice(1, -1);
frutasNew.push("Melão");
console.log(frutasNew);