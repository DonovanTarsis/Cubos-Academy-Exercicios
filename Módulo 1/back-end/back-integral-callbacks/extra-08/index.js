const nomes = ['Maria', 'João', 'José', 'Antonio', 'Beatriz', "anderson", 'Camila', "amanda", "Amaral"];

const nomesIniciamEmA = nomes.filter(x => x[0] === "a" || x[0] === "A");
console.log(nomesIniciamEmA);