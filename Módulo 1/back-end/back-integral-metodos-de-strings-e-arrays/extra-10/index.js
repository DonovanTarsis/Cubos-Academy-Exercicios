function removerPontuação(text) {
    while (text.includes(".")) {
        text = text.replace(".", "")
    }
    while (text.includes("-")) {
        text = text.replace("-", "")
    }
    console.log(text)
}


const cpf = "011.022.033-44";
removerPontuação(cpf);