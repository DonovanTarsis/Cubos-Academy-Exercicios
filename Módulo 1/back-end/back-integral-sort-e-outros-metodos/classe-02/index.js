const cidades = ['Salvador', 'São Paulo', 'Brasilia', 'Recife', 'Rio de Janeiro'];
console.log(cidades.reduce((acc, item) => item.length > acc.length ? item : acc));
