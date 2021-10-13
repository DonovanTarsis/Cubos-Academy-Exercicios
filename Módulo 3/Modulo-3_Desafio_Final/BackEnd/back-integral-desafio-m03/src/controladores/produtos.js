const conexao = require('../conexao');
const { verificaItensCadastroProduto } = require('../validacoes/validacoes');

async function listarProdutos(req, res) {
    const { id } = req.usuario;
    const { categoria } = req.query;

    if (!categoria) {
        try {
            const query = 'SELECT * FROM produtos WHERE usuario_id = $1;';
            const { rowCount, rows: produtos } = await conexao.query(query, [id]);
            return res.status(200).json(produtos)
        } catch (error) {
            return res.status(400).json({ mensagem: error.message })
        }
    }
    try {
        const pesquisa = `%${categoria}%`;
        const query = 'SELECT * FROM produtos WHERE usuario_id = $1 AND categoria ILIKE $2;';
        const { rowCount, rows: produtos } = await conexao.query(query, [id, pesquisa]);
        return res.status(200).json(produtos)
    } catch (error) {
        res.status(400).json({ mensagem: error.message })
    }

}

async function detalharProduto(req, res) {
    try {
        return res.status(200).json(produto)
    } catch (error) {
        res.status(400).json({ mensagem: error.message })
    }

}

async function cadastrarProduto(req, res) {
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
    const { id } = req.usuario

    try {
        const erro = await verificaItensCadastroProduto(nome, quantidade, preco, descricao);

        if (erro) {
            return res.status(erro.status).json({ mensagem: erro.mensagem })
        }

        const query = 'INSERT INTO produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7);';
        const { rowCount } = await conexao.query(query, [id, nome, quantidade, categoria, preco, descricao, imagem])

        if (rowCount === 1) {
            return res.status(204).json();
        }

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

async function atualizarProduto(req, res) {
    const { id } = req.params;
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

    try {
        const erro = await verificaItensCadastroProduto(nome, quantidade, preco, descricao);

        if (erro) {
            return res.status(erro.status).json({ mensagem: erro.mensagem })
        }

        const query = 'UPDATE produtos SET nome = $1, quantidade = $2, categoria = $3, preco = $4, descricao = $5, imagem = $6 WHERE id = $7;';
        const { rowCount } = await conexao.query(query, [nome, quantidade, categoria, preco, descricao, imagem, id])

        if (rowCount === 1) {
            return res.status(204).json();
        }

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

async function deletarProduto(req, res) {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM produtos WHERE id = $1;';
        const { rowCount } = await conexao.query(query, [id])

        if (rowCount === 1) {
            return res.status(204).json();
        }

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = {
    listarProdutos,
    detalharProduto,
    cadastrarProduto,
    atualizarProduto,
    deletarProduto
}