const conexao = require('../conexao');

const listarUsuarios = async (req, res) => {
    try {
        const { rows: usuarios } = await conexao.query('select * from usuarios');

        for (const usuario of usuarios) {
            const { rows: emprestimos } = await conexao.query('select * from emprestimos where usuario_id = $1', [usuario.id]);
            usuario.emprestimos = emprestimos;
        }

        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await conexao.query('select * from usuarios where id = $1', [id]);
        
        if (usuario.rowCount === 0) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { rows: emprestimos } = await conexao.query('select * from emprestimos where usuario_id = $1', [usuario.rows[0].id]);
        usuario.rows[0].emprestimos = emprestimos;

        return res.status(200).json(usuario.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarUsuario = async (req, res) => {
    const { nome, idade, email, telefone, cpf } = req.body;

    if (!nome && !email && !cpf) {
        return res.status(400).json("Os campos nome, email e cpf são obrigatórios.");
    }

    try {
        const query = 'insert into usuarios (nome, idade, email, telefone, cpf) values ($1, $2, $3, $4, $5)';
        const usuario = await conexao.query(query, [nome, idade, email, telefone, cpf]);

        if (usuario.rowCount === 0) {
            return res.status(400).json('Não foi possivel cadastrar o usuario');
        }

        return res.status(200).json('usuario cadastrado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        const {rowCount, rows: usuario} = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [id])
        if(rowCount === 0) return res.status(404).json('Usuário não encontrado.')
        const {nome, idade, email, telefone, cpf} = usuario[0];
        const usuarioAtualizado ={
            nome: req.body.nome ?? nome,
            idade: req.body.idade ?? idade,
            email: req.body.email ?? email,
            telefone: req.body.telefone ?? telefone,
            cpf: req.cpf ?? cpf,
        }

        const atualizar = await conexao.query('UPDATE usuarios SET nome = $1, idade = $2, email = $3, telefone = $4, cpf = $5 WHERE id = $6', [usuarioAtualizado.nome, usuarioAtualizado.idade, usuarioAtualizado.email, usuarioAtualizado.telefone, usuarioAtualizado.cpf, id])

        if(atualizar.rowCount === 0) return res.status(400).json({mensagem: "Não foi possível atualizar o usuario!"})
        res.status(201).json({mensagem: "Usuário atualizado com sucesso!"})

    }catch (error){
        res.status(400).json(error.message)
    }
}

const excluirUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await conexao.query('select * from usuarios where id = $1', [id]);

        if (usuario.rowCount === 0) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { rowCount: emprestimos } = await conexao.query('select * from emprestimos where usuario_id = $1', [id]);
        
        
        if(emprestimos !== 0){
            return res.status(400).json(`Não foi possível excluir o usuario ${usuario.rows[0].nome} pois existem emprestimos cadastrados em seu nome.`);
        }

        const query = 'delete from usuarios where id = $1';
        const usuarioExcluido = await conexao.query(query, [id]);

        if (usuarioExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o usuario');
        }

        return res.status(200).json('usuario foi excluido com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarUsuarios,
    obterUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario
}