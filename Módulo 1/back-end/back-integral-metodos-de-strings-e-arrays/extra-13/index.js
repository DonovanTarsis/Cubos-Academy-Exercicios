function validArquivo(text){
    if(text.includes(".jpg") || text.includes(".png") || text.includes(".jpeg") || text.includes(".gif")){
        console.log("Arquivo válido");
    }else{
        console.log("Arquivo inválido");
    }
}

const nomeArquivo = 'Foto da Familia.pdf';
validArquivo(nomeArquivo);
