function urlAmigavel (text){
    let urlFormatada = text.toLowerCase();
    while(urlFormatada.includes(" ")){
        urlFormatada = urlFormatada.replace(" ", "-");
    }
    console.log(urlFormatada);
}
const texto = "Aprenda programar do zero na Cubos Academy";
urlAmigavel(texto);