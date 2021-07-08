function  encontrarLivro (lista, nomeLivro){
    console.log(`O livro está na posição ${lista.indexOf(nomeLivro) + 1}`)
}
const livros = ['Guerra e Paz', 'A Montanha Mágica', 'Cem Anos de Solidão', 'Dom Quixote', 'A Divina Comédia'];
const nomeDoLivro = "Guerra e Paz";
encontrarLivro(livros, nomeDoLivro);