const express = require('express');
const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "A Odisséia de Jonas",
        autor: "Thomas Crawling",
        ano: 2001,
        numPaginas: 197
    },
    {
        id: 2,
        titulo: "Jonas e a sociedade escondida",
        autor: "Claire Crawling",
        ano: 2004,
        numPaginas: 158
    }
];
let geradorDeId = () => {
    let contador = 1;
    if(livros.length === livros[livros.length - 1].id){
        contador = livros.length + 1
        return contador
    }
    while(true){
        if(livros.find(x => x.id === contador)){
            contador++
        }else{
            return contador
        }
    }
        
}

app.get('/livros', (req, res) => {
    console.log('Requisição da lista de Livros');
    res.json(livros)
})

app.get('/livros/:id', (req, res) => {
    console.log('Requisição de livro por ID.');
    const livro = livros.find(x => x.id === Number(req.params.id))
    if(livro){
        res.json(livro)
    }else if(!Number(req.params.id)){
        res.json({
            "mensagem": "O valor do parâmetro ID da URL não é um número válido."
        })
    }else{
        res.json({
            "mensagem": "Não existe livro para o ID informado."
        })
    }
})

app.post('/livros', (req, res) => {
    console.log('Requisição para adicionar livro.');
    const {titulo, autor, ano, numPaginas} = req.body
    const livro = {
        id: geradorDeId(),
        titulo: titulo,
        autor: autor,
        ano: ano,
        numPaginas: numPaginas
    }
    livros.splice((livro.id - 1), 0, livro);
    res.json(livro)
})

app.put('/livros/:id', (req, res) => {
    console.log('Requisição de substituição de livro.');
    const livro = livros.find(x => x.id === Number(req.params.id))
    if(livro){

        livro.titulo = req.body.titulo;
        livro.autor = req.body.autor;
        livro.ano = req.body.ano;
        livro.numPaginas = req.body.numPaginas;

        res.json({
            "mensagem": "Livro substituído."
        })
        
    }else if(!Number(req.params.id)){
        res.json({
            "mensagem": "O valor do parâmetro ID da URL não é um número válido."
        })
    }else{
        res.json({
            "mensagem": "Não existe livro a ser substituído para o ID informado."
        })
    }
})


app.patch('/livros/:id', (req, res) => {
    const livro = livros.find(x => x.id === Number(req.params.id))
    if(livro){
        if(req.body.titulo){
            livro.titulo = req.body.titulo;
        }
        if(req.body.autor){
            livro.autor = req.body.autor;
        }
        if(req.body.ano){
            livro.ano = req.body.ano;
        }
        if(req.body.numPaginas){
            livro.numPaginas = req.body.numPaginas;
        }
        res.json({
            "mensagem": "Livro alterado."
        })
    }else if(!Number(req.params.id)){
        res.json({
            "mensagem": "O valor do parâmetro ID da URL não é um número válido."
        })
    }else{
        res.json({
            "mensagem": "Não existe livro a ser alterado para o ID informado."
        })
    }
})

app.delete('/livros/:id', (req, res) => {
    const livro = livros.find(x => x.id === Number(req.params.id))
    if(livro){
        const indice = livros.indexOf(livro);
        livros.splice(indice, 1);
        res.json({
            "mensagem": "Livro removido."
        })
    }else if(!Number(req.params.id)){
        res.json({
            "mensagem": "O valor do parâmetro ID da URL não é um número válido."
        })
    }else{
        res.json({
            "mensagem": "Não existe livro a ser removido para o ID informado."
        })
    }
})

app.listen(8000);