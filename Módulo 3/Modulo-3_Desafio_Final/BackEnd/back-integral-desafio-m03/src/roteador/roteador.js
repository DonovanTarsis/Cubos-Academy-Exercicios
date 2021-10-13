const express = require('express');
const { login } = require('../controladores/login');
const { listarProdutos, detalharProduto, cadastrarProduto, atualizarProduto, deletarProduto } = require('../controladores/produtos');
const { cadastrarUsuario, detalharUsuario, atualizarUsuario } = require('../controladores/usuarios');
const { verificaLogin, verificaPermicaoAcesso } = require('../filtros/verificaPermicao');

const roteador = express();

roteador.post('/usuario', cadastrarUsuario);
roteador.post('/login', login);

roteador.get('/usuario', verificaLogin, detalharUsuario);
roteador.put('/usuario', verificaLogin, atualizarUsuario);

roteador.get('/produtos', verificaLogin, listarProdutos);
roteador.get('/produtos/:id', verificaLogin, verificaPermicaoAcesso, detalharProduto);
roteador.post('/produtos', verificaLogin, cadastrarProduto);
roteador.put('/produtos/:id', verificaLogin, verificaPermicaoAcesso, atualizarProduto);
roteador.delete('/produtos/:id', verificaLogin, verificaPermicaoAcesso, deletarProduto);





module.exports = roteador;