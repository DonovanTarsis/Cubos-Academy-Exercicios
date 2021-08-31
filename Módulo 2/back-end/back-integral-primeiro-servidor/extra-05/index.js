const express = require('express');
const app = express();
const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
let contador = 0;


app.get('/', (req, res) => {
    console.log('recebi uma requisição para mostrar o próximo jogador')
    if(contador >= jogadores.length){
        contador = 0;
    }
    res.send(`É a vez de ${jogadores[contador]} jogar!`)
    contador++
})

app.get('/remover', (req, res) => {
    console.log('recebi uma requisição para remover um jogador')
    if(req.query.indice >= jogadores.length || req.query.indice < 0){
        res.send(`Não existe jogador no índice informado (${req.query.indice}) para ser removido.`)
    }else{
        jogadores.splice(req.query.indice, 1)
        res.send(`${jogadores}`)
        contador--
    }
})


app.get('/adicionar', (req, res) => {
    console.log('recebi uma requisição para adicionar um jogador')
    if(req.query.nome && req.query.indice <= jogadores.length){
        jogadores.splice(req.query.indice, 0, `${req.query.nome[0].toUpperCase()}${req.query.nome.substr(1).toLowerCase()}`);
        res.send(`${jogadores}`);
        if(req.query.indice < contador){
            contador++
        }
    }else if(req.query.indice > jogadores.length){
        res.send(`O índice informado (${req.query.indice}) não existe no array. Novo jogador não adicionado.`)
    }else if(req.query.nome){
        jogadores.push(`${req.query.nome[0].toUpperCase()}${req.query.nome.substr(1).toLowerCase()}`)
        res.send(`${jogadores}`)
    }
})


app.listen(8000)