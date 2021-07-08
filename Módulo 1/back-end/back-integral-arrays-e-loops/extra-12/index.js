const filaDeDentro = ["Jose", "Maria", "Joao"];
const filaDeFora = ["Joana", "Roberta", "Marcos", "Felipe"];

let mudarFila;

for(let i = 0; filaDeDentro.length < 5 ; filaDeDentro.push){
    mudarFila = filaDeFora[0];
    filaDeDentro.push(mudarFila);
    filaDeFora.shift();
}
console.log(filaDeDentro);
console.log(filaDeFora);