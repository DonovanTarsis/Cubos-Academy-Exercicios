const express = require('express');
const axios = require('axios');
const app = express();

app.get('/pokemon', async (req, res) => {
    const momento = new Date();
    console.log("Requisição de lista de pokemons", momento)
    const offset = req.query.offset;
    const limit = req.query.limit;
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    res.json({
        "results": resposta.data.results,
    })
})
app.get('/pokemon/:idOuNome', async (req, res) => {
    const momento = new Date();
    console.log("Requisição de pokemon", momento)
    const parametro = req.params.idOuNome
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parametro}`);
    const {id, name, height, weight, base_experience, forms, abilities, species} = resposta.data;
    res.json({id, name, height, weight, base_experience, forms, abilities, species})
})

app.listen(8000);