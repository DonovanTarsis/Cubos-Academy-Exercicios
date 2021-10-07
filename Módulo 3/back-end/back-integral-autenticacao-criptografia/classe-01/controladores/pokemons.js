const conexao = require('../conexao_bd/conexao');
const jwt = require('jsonwebtoken');
const privateKeyTokenGenerate = require('../secured/jwt_secret');

async function cadastrarPokemon(req, res) {
    const { token, nome, apelido, habilidades, imagem } = req.body;
    if (!token) return res.status(400).json("O campo 'token' é obrigatório")
    let usuario;
    try {
        usuario = jwt.verify(token, privateKeyTokenGenerate);
    } catch (error) {
        return res.status(400).json("Token inválido.");
    }

    try {
        const query = "INSERT INTO pokemons (usuario_id, nome, apelido, habilidades, imagem) VALUES ($1, $2, $3, $4, $5)";

        conexao.query(query, [usuario.id, nome, apelido, habilidades, imagem])
        res.status(201).json("Pokemon cadastrado com sucesso")
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

async function updatePokemon(req, res) {
    const { token, apelido } = req.body;
    const { id } = req.params;
    if (!apelido) return res.status(400).json("O campo 'apelido' é obrigatório")
    if (!token) return res.status(400).json("O campo 'token' é obrigatório")
    let usuario;
    try {
        usuario = jwt.verify(token, privateKeyTokenGenerate);
    } catch (error) {
        return res.status(400).json("Token inválido.")
    }
    try {
        const { rowCount, rows: pokemon } = await conexao.query('SELECT * FROM pokemons WHERE id = $1', [id])
        if (rowCount === 0) return res.status(404).json('Pokemon não encontrado.')

        if (pokemon[0].usuario_id !== usuario.id) return res.status(400).json("Você não é o propietário deste pokemon.")


        const atualizar = await conexao.query('UPDATE pokemons SET apelido = $1 WHERE id = $2', [apelido, id])

        if (atualizar.rowCount === 0) return res.status(400).json({ mensagem: "Não foi possível atualizar o usuario!" })
        res.status(201).json({ mensagem: "Pokemon atualizado com sucesso!" })

    } catch (error) {
        res.status(400).json(error.message)
    }

}

async function listPokemons(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json("O campo 'token' é obrigatório")
    let usuario;
    try {
        usuario = jwt.verify(token, privateKeyTokenGenerate);
    } catch (error) {
        return res.status(400).json("Token inválido.")
    }

    try {
        const query = "SELECT p.id, u.nome as usuario, p.nome, p.apelido, p.habilidades, p.imagem FROM pokemons p LEFT JOIN usuarios u ON p.usuario_id = u.id"

        const { rowCount, rows: pokemons } = await conexao.query(query, []);

        for (let item of pokemons) {
            const pokemon = pokemons.find(i => i.id === item.id);

            const habilidades = (pokemon.habilidades).split(',')
            pokemon.habilidades = habilidades
        }

        res.status(200).json(pokemons)

    } catch (error) {
        return res.status(400).json(error.message)
    }

}

async function obterPokemon(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json("O campo 'token' é obrigatório")
    const { id } = req.params;
    let usuario;
    try {
        usuario = jwt.verify(token, privateKeyTokenGenerate);
    } catch (error) {
        return res.status(400).json("Token inválido.")
    }

    try {
        const query = "SELECT p.id, u.nome as usuario, p.nome, p.apelido, p.habilidades, p.imagem FROM pokemons p LEFT JOIN usuarios u ON p.usuario_id = u.id WHERE p.id = $1"

        const { rowCount, rows: pokemons } = await conexao.query(query, [id]);

        if (rowCount === 0) return res.status(404).json('Pokemon não encontrado.')

        const pokemon = pokemons.find(item => item.id == id);

        const habilidades = (pokemon.habilidades).split(',')
        pokemon.habilidades = habilidades

        res.status(200).json(pokemons[0])

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

async function deletePokemon(req, res) {
    const { token } = req.body;
    const { id } = req.params;

    if (!token) return res.status(400).json("O campo 'token' é obrigatório")
    let usuario;
    try {
        usuario = jwt.verify(token, privateKeyTokenGenerate);
    } catch (error) {
        return res.status(400).json("Token inválido.")
    }

    try {
        const {rowCount, rows:pokemon} = await conexao.query('SELECT * FROM pokemons WHERE id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json('Pokemon não encontrado');
        }
        
        if (pokemon[0].usuario_id !== usuario.id) return res.status(400).json("Você não é o propietário deste pokemon.")

        const query = 'DELETE FROM pokemons WHERE id = $1';
        const pokemonExcluido = await conexao.query(query, [id]);

        if (pokemonExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possível excluir o pokemon');
        }

        return res.status(200).json('Pokemon excluido com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    cadastrarPokemon,
    updatePokemon,
    listPokemons,
    obterPokemon,
    deletePokemon
}