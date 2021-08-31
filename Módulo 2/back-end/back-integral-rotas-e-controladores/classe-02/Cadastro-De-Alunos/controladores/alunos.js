const alunos = require("../dados/alunos");
const cursos = require("../dados/cursos");

const validacaoDeDados = (aluno) => {
    const {nome, sobrenome, idade, curso} = aluno;
    if (!nome){
        return 'O campo "nome" é obrigatório.'
    }
    if (!sobrenome){
        return 'O campo "sobrenome" é obrigatório.'
    }
    if (!idade){
        return 'O campo "idade" é obrigatório.'
    }
    if (!curso){
        return 'O campo "curso" é obrigatório.'
    }
    if (nome.split("").every(x => x === " ")){
        return 'O campo "nome" não pode estar vazio.'
    }
    if (sobrenome.split("").every(x => x === " ")){
        return 'O campo "sobrenome" não pode estar vazio.'
    }
    if (curso.split("").every(x => x === " ")){
        return 'O campo "curso" não pode estar vazio.'
    }
    if (typeof nome !== "string"){
        return 'O campo "nome" deve receber um texto.'
    }
    if (typeof sobrenome !== "string"){
        return 'O campo "sobrenome" deve receber um texto.'
    }
    if (typeof idade !== "number"){
        return 'O campo "idade" deve receber um número.'
    }
    if (typeof curso !== "string"){
        return 'O campo "curso" deve receber um texto.'
    }
    if (idade < 18){
        return 'O aluno deve ser maior de idade.'
    }
    /* if (cursos.includes(curso)){
        return 'Curso inválido.'
    } */
}

const geradorDeId = (array) => {
    let contador = 1;
    if( array.length > 0 && array.length === array[array.length - 1].id){
        contador = array.length + 1
        return contador
    }
    while(true){
        if(array.find(x => x.id === contador)){
            contador++
        }else{
            return contador
        }
    }
        
}

function listarTodos (req, res) {
    res.json(alunos);
}

function listarAlunoPorId (req, res) {
    const aluno = alunos.find(x => x.id === Number(req.params.id))
    
    if(!Number(req.params.id)){
        res.status(400)
        res.json({
            "mensagem": "O valor do parâmetro ID deve ser um número válido."
        })
        return
    }
    if(!aluno){
        res.status(404)
        res.json({
            "mensagem": "Não foi encontrado nenhum aluno com o ID " + req.params.id
        })
        return
    }
    res.json(aluno)
}

function adicionarAluno (req, res) {
    const {nome, sobrenome, idade, curso} = req.body
    const aluno = {
        id: geradorDeId(alunos),
        nome,
        sobrenome,
        idade,
        curso
    }
    const erro = validacaoDeDados(aluno)
    if(erro){
        res.status(400)
        res.json({
            "mensagem": erro
        })
        return
    }
    alunos.splice((aluno.id - 1), 0, aluno);
    res.status(201)
    res.json("")
}

function deletarAluno (req, res) {
    const aluno = alunos.find(x => x.id === Number(req.params.id))
    
        if(!Number(req.params.id)){
            res.status(400)
            res.json({
                "mensagem": "O valor do parâmetro ID deve ser um número válido."
            })
            return
        }
        if(!aluno){
            res.status(404)
            res.json({
                "mensagem": "Não foi encontrado nenhum aluno com o ID " + req.params.id
            })
            return
        }

        const indice = alunos.indexOf(aluno);
        alunos.splice(indice, 1);
        res.json(aluno)
}

function substituirAluno (req, res) {
    const aluno = alunos.find(x => x.id === Number(req.params.id))
    const {id, nome, sobrenome, idade, curso} = req.body
    const alunoBody = {
        id,
        nome,
        sobrenome,
        idade,
        curso
    }
    const erro = validacaoDeDados(alunoBody)
    if (id !== Number(req.params.id)){
        res.status(400)
        res.json({
            "mensagem": "O ID informado no cadastro deve ser idêntico ao ID da URL."
        })
        return
    }
    if(erro){
        res.status(400)
        res.json({
            "mensagem": erro
        })
        return
    }
    if(aluno){
        aluno.nome = nome;
        aluno.sobrenome = sobrenome;
        aluno.idade = idade;
        aluno.curso = curso;
        res.status(201);
        res.json("");
        return;
    }
    alunos.push(alunoBody);
    res.status(201);
    res.json("");
}

function editarAluno (req, res) {
    const aluno = alunos.find(x => x.id === Number(req.params.id))
    const erro = validacaoDeDados({
        nome: req.body.nome ?? aluno.nome,
        sobrenome: req.body.sobrenome ?? aluno.sobrenome,
        idade: req.body.idade ?? aluno.idade,
        curso: req.body.curso ?? aluno.curso,
    })
    if(erro){
        res.status(400);
        res.json({
            "mensagem": erro
        })
        return
    }
    if(!Number(req.params.id)){
        res.status(400)
        res.json({
            "mensagem": "O valor do parâmetro ID deve ser um número válido."
        })
        return
    }
    if(!aluno){
        res.status(404)
        res.json({
            "mensagem": "Não foi encontrado nenhum aluno com o ID " + req.params.id
        })
        return
    }
    if(req.body.nome){
        aluno.nome = req.body.nome;
    }
    if(req.body.sobrenome){
        aluno.sobrenome = req.body.sobrenome;
    }
    if(req.body.idade){
        aluno.idade = req.body.idade;
    }
    if(req.body.curso){
        aluno.curso = req.body.curso;
    }
    res.status(201)
    res.json("")
}

module.exports = {
    listarTodos,
    listarAlunoPorId,
    adicionarAluno,
    deletarAluno,
    substituirAluno,
    editarAluno
}