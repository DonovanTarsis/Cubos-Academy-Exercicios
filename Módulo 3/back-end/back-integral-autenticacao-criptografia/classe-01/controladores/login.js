const conexao = require('../conexao_bd/conexao');
const jwt = require('jsonwebtoken')
const privateKeyTokenGenerate = require('../secured/jwt_secret')
const securePassword = require('secure-password');
const pwd = securePassword()

async function login (req, res) {
    const {email, senha} = req.body;
    
    if(!email) return res.status(400).json("O campo 'email' é obrigatório.");
    if(!senha) return res.status(400).json("O campo 'senha' é obrigatório.");
    try {
        
        const query = "SELECT * FROM usuarios WHERE email = $1";
        const {rowCount, rows} = await conexao.query(query, [email]);
        
        if(rowCount === 0) return res.status(400).json("Email ou senha incorretos");
        
        const userPassword = Buffer.from(senha)
        const usuario = rows[0];
    
        const result = await pwd.verify(userPassword, Buffer.from(usuario.senha, 'hex'))
    
        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json("Email ou senha incorretos");
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:     
              try {
                const hexHash = await (pwd.hash(userPassword)).toString('hex')
                
                await conexao.query('UPDATE usuarios SET senha = $1 WHERE email = $2', [hexHash, email])
                
              } catch{
              }
              break;
        }
    
        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }, privateKeyTokenGenerate, {
              expiresIn : "3h" })
    
        res.send(token)
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    login
}