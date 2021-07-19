function solucao(texto) {
    console.log(texto.trim().split(" ").filter(x => x !== "").length);
}

const texto = "Um texto qualquer"
solucao(texto)