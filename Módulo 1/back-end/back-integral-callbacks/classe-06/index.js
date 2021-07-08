const jogadores = ['Guido', 'Dina', 'Léo', 'Nanda', 'Juninho'];
let indice = 0;
const vezDeFulano = () => {
    if (indice === jogadores.length){
        console.log("A rodada terminou!");
        indice = 0;
        clearInterval(intervalid);
    }else{
        console.log(jogadores[indice])
        indice++
    }
}
let tempo = 10000 / jogadores.length
const intervalid = setInterval(vezDeFulano, tempo);
