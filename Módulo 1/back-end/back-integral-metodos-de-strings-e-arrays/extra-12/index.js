function gerarNickname (nome){
    nome = nome.replace(" ", "");
    if(nome.length <= 12){
        console.log(`@${nome.toLowerCase()}`);
    }else{
        console.log(`@${nome.slice(0,12).toLowerCase()}`);
    }
}
const nome = 'Guido Cerqueira';
gerarNickname(nome);
