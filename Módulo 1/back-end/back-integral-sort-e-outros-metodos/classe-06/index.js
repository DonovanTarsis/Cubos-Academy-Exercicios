const numeros = [0, 122, 4, 6, 7, 8, 44];

if(numeros.every(x => x % 2 === 0)){
    console.log("array válido");
}else{
    console.log("array inválido")
}