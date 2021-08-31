const express = require('express');
const axios = require('axios');
const fs = require('fs/promises');
const app = express();

app.get('/endereco/:cep', async (req, res) => {
    const momento = new Date();
    console.log("Requisição de endereço", momento)
    const parametro = req.params.cep
    const arquivo = JSON.parse(await fs.readFile('enderecos.json'));
    const enderecos =arquivo.enderecos;
    for (let endereco of enderecos){
        const cep = endereco.cep.replace("-", "");
        if(cep === parametro){
            res.json(endereco);
            return
        }
    }
    const resposta = await axios.get(`https://viacep.com.br/ws/${parametro}/json/`)
    
    const promise = adicionarAoJson(enderecos, arquivo, resposta);
    res.json(resposta.data)
})

app.get('/endereco/:uf/:cidade/:logradouro', async (req, res) => {
    const momento = new Date();
    console.log("Requisição de endereço", momento)
    const parametroUf = req.params.uf;
    const parametroCidade = req.params.cidade;
    const parametroLogradouro = req.params.logradouro;
    const arquivo = JSON.parse(await fs.readFile('enderecos.json'));
    const enderecos =arquivo.enderecos;
    const enderecosEncontrados = [];
    if (true){
        for (let endereco of enderecos){
            const logradouro = endereco.logradouro;
            const cidade = endereco.localidade;
            const uf = endereco.uf;
            if(logradouro === parametroLogradouro && cidade === parametroCidade && uf === parametroUf){
                enderecosEncontrados.push(endereco)
            }
        }
        if(enderecosEncontrados.length > 0){
            res.json(enderecosEncontrados)
            return
        }
    }
    const resposta = await axios.get(`https://viacep.com.br/ws/${parametroUf}/${parametroCidade}/${parametroLogradouro}/json/`)
    
    const promise = adicionarGrupoAoJson(arquivo);
    res.json(resposta.data)
})

app.listen(8000);
async function adicionarAoJson(enderecos, arquivo, resposta) {
    enderecos.push(resposta.data)
    fs.writeFile('enderecos.json', JSON.stringify(arquivo, null, '\t'))
}

async function adicionarGrupoAoJson(enderecos, arquivo, resposta) {
    for(let itemR of resposta.data){
        let existe = false;
        for(let itemV of enderecos){
            if(itemR.cep == itemV.cep){
                existe = true;
                break
            }
        }
        if(!existe){
            enderecos.push(itemR)
            console.log('Add em Json')
        }
    }
    fs.writeFile('enderecos.json', JSON.stringify(arquivo, null, '\t'))
}