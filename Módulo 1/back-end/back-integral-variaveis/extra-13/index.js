const raio = 5;
const altura = 10;
const areaBase = Math.PI * (raio ** 2);
const areaLateral = 2 * Math.PI * raio * altura;
//const areaT1 = (areaBase * 2) + areaLateral;
const areaT2 = 2 * Math.PI * raio * (raio + altura);
//console.log(areaT1);
console.log(areaT2);
