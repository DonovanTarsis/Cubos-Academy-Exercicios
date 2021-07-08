const numeros = [54, 22, 14, 87, 10, 284];
let posicoes = [];
for(let i = 0; i < numeros.length ; i++){
    if(numeros[i] === 10){
        posicoes.push(i)
    }
}if(posicoes.length === 0){
    console.log(-1)
}else if(posicoes.length === 1){
    console.log(posicoes[0])
}else{
    for(let n of posicoes){
        console.log(n)
    }
}