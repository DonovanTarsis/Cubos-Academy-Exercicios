const express = require('express');
const app = express();

app.get('/:operacao', (req, res) => {
    console.log(`requisição de ${req.params.operacao}`)
    if(req.params.operacao === 'somar'){
        let somar = Number(req.query.num1) + Number(req.query.num2);
        res.send(`${somar}`)
    }
    
    else if(req.params.operacao === 'subtrair'){
        let subtrair = Number(req.query.num1) - Number(req.query.num2);
        res.send(`${subtrair}`)
    }
    
    else if(req.params.operacao === 'multiplicar'){
        let multiplicar = Number(req.query.num1) * Number(req.query.num2);
        res.send(`${multiplicar}`)
    }
    
    else if(req.params.operacao === 'dividir'){
        let dividir = Number(req.query.num1) / Number(req.query.num2);
        res.send(`${dividir}`)
    }else{
        res.status(404);
        res.send('404 not found')
    }
})
app.listen(8000)



/* 
app.get('/somar', (req, res) => {
    let somar = Number(req.query.num1) + Number(req.query.num2);
    res.send(`${somar}`)
})

app.get('/subtrair', (req, res) => {
    let subtrair = Number(req.query.num1) - Number(req.query.num2);
    res.send(`${subtrair}`)
})

app.get('/multiplicar', (req, res) => {
    let multiplicar = Number(req.query.num1) * Number(req.query.num2);
    res.send(`${multiplicar}`)
})

app.get('/dividir', (req, res) => {
    let dividir = Number(req.query.num1) / Number(req.query.num2);
    res.send(`${dividir}`)
}) 
*/