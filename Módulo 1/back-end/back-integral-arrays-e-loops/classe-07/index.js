const nomes = ["Ana", "Joana", "Carlos", "amanda"];
const nomesA = [];

for(let nome of nomes){
    if(nome[0] === "A" || nome[0] === "a"){
        nomesA.push(nome);
    }
}console.log(nomesA);
