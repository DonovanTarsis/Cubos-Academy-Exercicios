const express = require('express');
const { listarTodos, listarAlunoPorId, adicionarAluno, substituirAluno, editarAluno, deletarAluno } = require('./controladores/alunos');
const roteador = express();

roteador.get('/alunos', listarTodos);
roteador.get('/alunos/:id', listarAlunoPorId);
roteador.post('/alunos', adicionarAluno);
roteador.put('/alunos/:id', substituirAluno);
roteador.patch('/alunos/:id', editarAluno);
roteador.delete('/alunos/:id', deletarAluno);

module.exports = roteador;