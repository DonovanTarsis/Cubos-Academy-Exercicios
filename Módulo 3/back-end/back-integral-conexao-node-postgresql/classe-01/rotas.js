const express = require('express');
const autores = require('./controladores/autores');
const livros = require('./controladores/livros');
const usuarios = require('./controladores/usuarios');
const emprestimos = require('./controladores/emprestimos');

const rotas = express();

// autores
rotas.get('/autores', autores.listarAutores);
rotas.get('/autores/:id', autores.obterAutor);
rotas.post('/autores', autores.cadastrarAutor);
rotas.put('/autores/:id', autores.atualizarAutor);
rotas.delete('/autores/:id', autores.excluirAutor);

// livros
rotas.get('/livros', livros.listarLivros);
rotas.get('/livros/:id', livros.obterLivro);
rotas.post('/livros', livros.cadastrarLivro);
rotas.put('/livros/:id', livros.atualizarLivro);
rotas.delete('/livros/:id', livros.excluirLivro);

// usuarios
rotas.get('/usuarios', usuarios.listarUsuarios);
rotas.get('/usuarios/:id', usuarios.obterUsuario);
rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.put('/usuarios/:id', usuarios.atualizarUsuario);
rotas.delete('/usuarios/:id', usuarios.excluirUsuario);

// emprestimos
rotas.get('/emprestimos', emprestimos.listarEmprestimos);
rotas.get('/emprestimos/:id', emprestimos.obterEmprestimo);
rotas.post('/emprestimos', emprestimos.cadastrarEmprestimo);
rotas.put('/emprestimos/:id', emprestimos.atualizarEmprestimo);
rotas.delete('/emprestimos/:id', emprestimos.excluirEmprestimo);

module.exports = rotas;