const letras = ["A", "a", "B", "C",];
let contador = 0;
for(let letra of letras){
    if(letra === "E" || letra === "e"){
        contador++;
    }
}if(!contador){
    console.log('Nenhuma letra "E" ou "e" foi encontrada.')
}else{
    console.log(`Foram encontradas ${contador} ${contador === 1 ? 'letra' : 'letras'} "E" ou "e".`)
}