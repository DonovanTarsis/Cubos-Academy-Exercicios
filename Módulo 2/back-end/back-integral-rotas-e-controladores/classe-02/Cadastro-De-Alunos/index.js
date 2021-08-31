const express = require('express');
const { logarRequisicao, validarSenha } = require('./intermediarios');
const roteador = require('./roteadores');
const app = express();

app.use(express.json());
app.use(logarRequisicao)
app.use(validarSenha)
app.use(roteador);

app.listen(8000);