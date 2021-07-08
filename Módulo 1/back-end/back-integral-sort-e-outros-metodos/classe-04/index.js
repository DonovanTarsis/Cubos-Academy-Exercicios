const palavras = ['livro', 'caneta', 'sol', 'carro', 'orelha'];
if(palavras.some(x => x.length > 5)){
    console.log("existe palavra inválida.")
}else{
    console.log("array validado.")
}