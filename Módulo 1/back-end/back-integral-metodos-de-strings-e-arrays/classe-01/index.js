function filtrarComentario (text){
    text = text.toLowerCase();
    if(text.includes("covid") || text.includes("pandemia")){
        console.log("Comentário bloqueado por conter palavras proibidas");
    }else{
        console.log("Comentário autorizado.");
    }
}
const comentario = "Esse COVID é muito perigoso!";
filtrarComentario(comentario);
