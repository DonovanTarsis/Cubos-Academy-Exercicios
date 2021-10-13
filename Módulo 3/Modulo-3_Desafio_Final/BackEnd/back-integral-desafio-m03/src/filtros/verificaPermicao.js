const conexao = require('../conexao');
const jwt = require('jsonwebtoken')
const privateKeyTokenGenerate = require('../secured/jwt_secret')

async function verificaLogin(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Token não informado." });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, privateKeyTokenGenerate);
        const query = 'SELECT id, nome, email, nome_loja FROM usuarios WHERE id = $1';
        const { rowCount, rows } = await conexao.query(query, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
        req.usuario = rows[0];
        return next();
    } catch (error) {
        if (error.message === 'invalid token') {
            return res.status(400).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }
        res.status(400).json({ mensagem: error.message })
    }
}

async function verificaPermicaoAcesso(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.usuario;

    try {
        const query = 'SELECT * FROM produtos WHERE id = $1;';
        const { rowCount, rows } = await conexao.query(query, [id]);
        if (rowCount === 0) {
            return res.status(404).json({ mensagem: `Não existe produto cadastrado com ID ${id}.` });
        }
        const produto = rows[0]
        if (produto.usuario_id !== userId) {
            return res.status(403).json({ mensagem: "O usuário logado não tem permissão para acessar, modificar ou deletar este produto." });
        }
        next()
    } catch (error) {
        res.status(400).json({ mensagem: error.message })
    }
}





module.exports = {
    verificaLogin,
    verificaPermicaoAcesso
}