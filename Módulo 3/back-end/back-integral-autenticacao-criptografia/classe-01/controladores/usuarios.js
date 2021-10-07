const securePassword = require('secure-password');
const pwd = securePassword();

const conexao = require('../conexao_bd/conexao');



async function cadastrarUsuario (req, res) {
    const {nome, email, senha} = req.body;
    if (!nome) return res.status(400).json("O campo 'nome' é obrigatório.")
    if (!email) return res.status(400).json("O campo 'email' é obrigatório.")
    if (!senha) return res.status(400).json("O campo 'senha' é obrigatório.")

    const select = "SELECT * FROM usuarios WHERE email = $1";
    const {rowCount} = await conexao.query(select, [email]);

    if(rowCount !== 0) return res.status(400).json("Email já cadastrado");
    
    
    try {
        const userPassword = Buffer.from(senha);
        const hexHash = (await pwd.hash(userPassword)).toString('hex');

        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
        await conexao.query(query, [nome, email, hexHash])
    
        res.json("Usuário cadastrado com sucesso.")
        
    } catch (error) {
        res.status(400).json(error.message)
    }

}


module.exports = {
    cadastrarUsuario
}