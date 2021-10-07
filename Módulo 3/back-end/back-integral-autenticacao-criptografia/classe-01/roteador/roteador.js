const express = require('express');
const { login } = require('../controladores/login');
const { cadastrarPokemon, updatePokemon, listPokemons, obterPokemon, deletePokemon } = require('../controladores/pokemons');
const { cadastrarUsuario } = require('../controladores/usuarios');

const roteador = express();


roteador.post('/usuarios', cadastrarUsuario);
roteador.post('/login', login);

roteador.get('/pokemons', listPokemons);
roteador.get('/pokemons/:id', obterPokemon);

roteador.post('/pokemons', cadastrarPokemon);
roteador.put('/pokemons/:id', updatePokemon);

roteador.delete('/pokemons/:id', deletePokemon);








module.exports = roteador;