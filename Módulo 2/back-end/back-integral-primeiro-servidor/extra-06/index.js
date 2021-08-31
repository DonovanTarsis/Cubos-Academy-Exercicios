const express = require('express');
const app = express();
let minutos = 0;
let segundos = 0;
let iniciado = false;
let pausado = true;
const cronometro = () => {
    if(segundos === 59){
        segundos = 0;
        minutos++
    }else{
        segundos++
    }
        
}
let stop;
app.get('/', (req, res) => {
    res.send(`Tempo atual do cronômetro: ${minutos <= 10? "0"+ minutos: minutos} ${minutos === 1? 'minuto' : 'minutos'} e ${segundos <= 10? "0"+ segundos: segundos} ${segundos === 1? 'segundo' : 'segundos'}`)
})

app.get('/:funcao', (req, res) => {
    if(req.params.funcao === 'iniciar'){
        if(!iniciado){
            const idSetInterval = setInterval(cronometro,1000)
            stop = idSetInterval;
            iniciado = true;
            pausado = false;
        }
        res.send(`Cronômetro iniciado!`)
    }else if(req.params.funcao === 'pausar'){
        if(!pausado){
            clearInterval(stop);
            pausado = true;
        }
        res.send(`Cronômetro pausado!`)
    }else if(req.params.funcao === 'continuar'){
        if(iniciado){
            const idSetInterval = setInterval(cronometro,1000)
            stop = idSetInterval;
            pausado = false;
        }
        res.send(`Cronômetro continuando!`);
    }else if(req.params.funcao === 'zerar'){
        segundos = 0;
        minutos = 0;
        res.send(`Cronômetro zerado!`);
        if(pausado){
            iniciado = false;
        }
    }
})


/* app.get('/iniciar', (req, res) => {
    if(!iniciado){
        const idSetInterval = setInterval(cronometro,1000)
        stop = idSetInterval;
        iniciado = true;
    }
    res.send(`Cronômetro iniciado!`)
})

app.get('/pausar', (req, res) => {
    if(iniciado){
        clearInterval(stop);
    }
    res.send(`Cronômetro pausado!`)
})

app.get('/continuar', (req, res) => {
    if(iniciado){
        const idSetInterval = setInterval(cronometro,1000)
        stop = idSetInterval;
    }
    res.send(`Cronômetro continuando!`);
})

app.get('/zerar', (req, res) => {
    segundos = 0;
    minutos = 0;
    res.send(`Cronômetro zerado!`);
}) */

app.listen(8000)