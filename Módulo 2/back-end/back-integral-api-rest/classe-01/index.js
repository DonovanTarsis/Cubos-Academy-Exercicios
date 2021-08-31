const express = require('express');
const app = express();
app.use(express.json())

const convidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];

app.get('/convidados', (req, res) => {

    if(req.query.nome){
        console.log('Requisição para saber se convidado consta na lista.');

        if(convidados.find(x => x === req.query.nome)){
            res.json({
            "mensagem": "Convidado presente."
            })
        }else{
            res.json({
            "mensagem": "O convidado buscado não está presente na lista."
            })
        }
    }else{
        console.log('Requisição da lista de convidados.');
    res.json(convidados);
    }
})

app.post('/convidados', (req, res) => {
    console.log('Requisição para adicionar convidado na lista.');
    const {nome} = req.body;
    if(!convidados.find(x => x === nome)){
        convidados.push(nome);
        res.json({
            "mensagem": "Convidado adicionado."
        })
    }else{
        res.json({
            "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."
        })
    }
})
app.delete('/convidados/:nome', (req, res) => {
    console.log('Requisição para remover convidado da lista.');
    if(!convidados.find(x => x === req.params.nome)){
        res.json({
            "mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido."
        })
    }else{
        const indice = convidados.indexOf(req.params.nome);
        convidados.splice(indice, 1)
        res.json({
            "mensagem": "Convidado removido."
        })
    }
})

app.listen(8000);
