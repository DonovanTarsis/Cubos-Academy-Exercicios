const express = require('express');
const { votar, imprimirVotos } = require('../controladores/controladores');

const roteador = express();

roteador.post('/votacao/:pais/:ip', votar);

roteador.get('/votacao', imprimirVotos);


module.exports = {roteador}