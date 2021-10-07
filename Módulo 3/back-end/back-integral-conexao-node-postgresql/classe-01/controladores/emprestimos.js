const conexao = require('../conexao');

const listarEmprestimos = async (req, res) => {
    try {
        const { rows: emprestimos } = await conexao.query('select e.id, u.nome as usuario, u.telefone, u.email, l.nome as livro, e.status  from emprestimos e join usuarios u on u.id = e.usuario_id join livros l on l.id = e.livro_id');
        return res.status(200).json(emprestimos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterEmprestimo = async (req, res) => {
    const { id } = req.params;
    try {
        const emprestimo = await conexao.query('select e.id, u.nome as usuario, u.telefone, u.email, l.nome as livro, e.status  from emprestimos e join usuarios u on u.id = e.usuario_id join livros l on l.id = e.livro_id where e.id = $1', [id]);

        if (emprestimo.rowCount === 0) {
            return res.status(404).json('Emprestimo não encontrado');
        }

        return res.status(200).json(emprestimo.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarEmprestimo = async (req, res) => {
    const { usuario_id, livro_id, status } = req.body;



    if (!usuario_id && !livro_id) {
        return res.status(400).json("Os campos usuario_id e livro_id são obrigatórios.");
    }

    try {

        if (!req.body.status) {
            const query = 'insert into emprestimos (usuario_id, livro_id) values ($1, $2)';
            const emprestimo = await conexao.query(query, [usuario_id, livro_id]);

            if (emprestimo.rowCount === 0) {
                return res.status(400).json('Não foi possivel cadastrar o emprestimo');
            }

            return res.status(200).json('Emprestimo cadastrado com sucesso.')
        }
        if (req.body.status !== "pendente" && req.body.status !== "devolvido") {
            return res.status(400).json({ mensagem: "O campo status aceita apenas os valores 'devolvido' ou 'pendente'." })
        }

        const query = 'insert into emprestimos (usuario_id, livro_id, status) values ($1, $2, $3)';
        const emprestimo = await conexao.query(query, [usuario_id, livro_id, status]);

        if (emprestimo.rowCount === 0) {
            return res.status(400).json('Não foi possivel cadastrar o emprestimo');
        }

        return res.status(200).json('Emprestimo cadastrado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarEmprestimo = async (req, res) => {
    const { id } = req.params;
    if (!req.body.status) {
        return res.status(400).json({ mensagem: "O campo status é obrigatório." })
    }
    if (req.body.status !== "pendente" && req.body.status !== "devolvido") {
        return res.status(400).json({ mensagem: "O campo status aceita apenas os valores 'devolvido' ou 'pendente'." })
    }
    try {
        const { rowCount, rows: emprestimo } = await conexao.query('SELECT * FROM emprestimos WHERE id = $1', [id])
        if (rowCount === 0) return res.status(404).json('Emprestimo não encontrado.')
        const { usuario_id, livro_id, status } = emprestimo[0];
        const emprestimoAtualizado = {
            usuario_id: usuario_id,
            livro_id: livro_id,
            status: req.body.status
        }

        const atualizar = await conexao.query('UPDATE emprestimos SET usuario_id = $1, livro_id = $2, status = $3 WHERE id = $4', [emprestimoAtualizado.usuario_id, emprestimoAtualizado.livro_id, emprestimoAtualizado.status, id])

        if (atualizar.rowCount === 0) return res.status(400).json({ mensagem: "Não foi possível atualizar o emprestimo!" })
        res.status(201).json({ mensagem: "Emprestimo atualizado com sucesso!" })

    } catch (error) {
        res.status(400).json(error.message)
    }
}

const excluirEmprestimo = async (req, res) => {
    const { id } = req.params;

    try {
        const emprestimo = await conexao.query('select * from emprestimos where id = $1', [id]);

        if (emprestimo.rowCount === 0) {
            return res.status(404).json('Emprestimo não encontrado');
        }

        const query = 'delete from emprestimos where id = $1';
        const emprestimoExcluido = await conexao.query(query, [id]);

        if (emprestimoExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o emprestimo');
        }

        return res.status(200).json('Emprestimo foi excluido com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarEmprestimos,
    obterEmprestimo,
    cadastrarEmprestimo,
    atualizarEmprestimo,
    excluirEmprestimo
}