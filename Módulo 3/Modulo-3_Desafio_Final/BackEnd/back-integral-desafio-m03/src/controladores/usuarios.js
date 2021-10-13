const conexao = require('../conexao');
const bcrypt = require('bcrypt')
const { verificaItensCadastroUsuario } = require('../validacoes/validacoes');

async function cadastrarUsuario(req, res) {
    const { nome, email, senha, nome_loja: nomeLoja } = req.body;
    const erro = await verificaItensCadastroUsuario(nome, email, senha, nomeLoja);

    if (erro) {
        return res.status(erro.status).json({ mensagem: erro.mensagem })
    }

    try {
        const usuario = await conexao.query('SELECT * FROM usuarios WHERE email = $1;', [email]);

        if (usuario.rowCount !== 0) {
            return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
        }

        const query = 'INSERT INTO usuarios (nome, nome_loja, email, senha) VALUES ($1, $2, $3, $4);';
        const passwordHash = await bcrypt.hash(senha, 10)
        const { rowCount } = await conexao.query(query, [nome, nomeLoja, email, passwordHash])

        if (rowCount === 1) {
            return res.status(204).json();
        }

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

async function detalharUsuario(req, res) {
    const { usuario } = req;
    res.status(200).json(usuario)

}

async function atualizarUsuario(req, res) {
    const { usuario } = req;
    const { nome, email, senha, nome_loja: nomeLoja } = req.body;
    const erro = await verificaItensCadastroUsuario(nome, email, senha, nomeLoja);

    if (erro) {
        return res.status(erro.status).json({ mensagem: erro.mensagem })
    }

    try {
        const temEmail = await conexao.query('SELECT * FROM usuarios WHERE email = $1 and id <> $2;', [email, usuario.id]);

        if (temEmail.rowCount !== 0) {
            return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
        }

        const query = 'UPDATE usuarios set nome = $1, nome_loja = $2, email = $3, senha = $4 WHERE id = $5;';
        const passwordHash = await bcrypt.hash(senha, 10)
        const { rowCount } = await conexao.query(query, [nome, nomeLoja, email, passwordHash, usuario.id])

        if (rowCount === 1) {
            return res.status(204).json();
        }

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
}