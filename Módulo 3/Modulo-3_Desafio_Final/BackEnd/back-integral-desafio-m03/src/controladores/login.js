const conexao = require('../conexao');
const jwt = require('jsonwebtoken')
const privateKeyTokenGenerate = require('../secured/jwt_secret')
const bcrypt = require('bcrypt')

async function login(req, res) {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(400).json({ mensagem: "O campo 'email' é obrigatório." });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: "O campo 'senha' é obrigatório." });
    }
    try {
        const query = "SELECT * FROM usuarios WHERE email = $1";
        const { rowCount, rows } = await conexao.query(query, [email]);

        if (rowCount === 0) {
            return res.status(400).json({ mensagem: "Email ou senha incorretos" });
        }

        const usuario = rows[0];
        const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

        if (!senhaVerificada) {
            return res.status(400).json({ mensagem: "Email ou senha incorretos" });
        }

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome_loja,
            email: usuario.email
        }, privateKeyTokenGenerate, {
            expiresIn: "8h"
        })
        res.send(token)
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = {
    login
}