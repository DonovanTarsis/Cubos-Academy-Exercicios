function seletorCarros (lista, index){
    console.log(lista.slice(index, index + 3).join(" - "))
}

const nomes = ['Ford Ká', 'Ranger', 'Hilux', 'Corola', 'Fusca', 'Chevete', 'Brasilia'];
const posicao = 3;
seletorCarros(nomes, posicao)