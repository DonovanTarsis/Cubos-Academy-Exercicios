const numeros = [8, 11, 21, 4, 1, 45];

let maior = 0;
let menor = numeros[0];
for(let item of numeros){
    if(item > maior){
        maior = item
    }if(item < menor){
        menor = item
    }
}console.log(maior-menor)
