const frutas = ["Manga", "UVA", "abacaxi", "banaNA", "MAçã"];
const novaLista = frutas.map((x, index) => `${index} - ${x[0].toUpperCase()}${x.slice(1, x.length).toLowerCase()}`)
console.log(novaLista);
