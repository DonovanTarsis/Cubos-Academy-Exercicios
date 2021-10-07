const express = require('express');
const app = express();
const roteador = require('./roteador/roteador')

app.use(express.json())
app.use(roteador)






module.exports = app;