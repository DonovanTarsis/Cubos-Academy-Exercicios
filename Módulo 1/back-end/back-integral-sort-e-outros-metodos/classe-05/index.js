const palavras = ["arroz", "feijão", "carne", "cerveja", "macarrão"];
if(palavras.some(x => x === "cerveja" || x === "vodka")){
    console.log(" revise sua lista, joão. possui bebida com venda proibida!")
}else{
    console.log("tudo certo, vamos as compras!")
}