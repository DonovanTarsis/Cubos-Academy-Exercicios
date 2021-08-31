function logarRequisicao (req, res, next) {
    console.log(req.method, req.url)
    next()
}


function validarSenha (req, res, next) {
    if(req.query.senha === 'cubos123'){
        next()
    }else{
        res.status(401);
        res.json({
            "mensagem": "Acesso negado. Senha inválida."
        })
    }
}

module.exports = {
    logarRequisicao,
    validarSenha
}