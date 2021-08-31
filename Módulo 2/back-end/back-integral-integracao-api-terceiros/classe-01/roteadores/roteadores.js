const express = require('express');
const { empresas } = require('../controladores/controladores');

const roteador = express();

roteador.get('/empresas/:dominioEmpresa', empresas)


module.exports = {roteador}