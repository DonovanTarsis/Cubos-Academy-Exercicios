async function verificaItensCadastroUsuario (nome, nomeLoja, email, senha) {
    if (!nome) return {status: 400, mensagem:"O campo 'nome' é obrigatório."};
    if (!nomeLoja) return {status: 400, mensagem:"O campo 'nome_loja' é obrigatório."};
    if (!email) return {status: 400, mensagem:"O campo 'email' é obrigatório."};
    if (!senha) return {status: 400, mensagem:"O campo 'senha' é obrigatório."};
}

async function verificaItensCadastroProduto (nome, quantidade, preco, descricao) {
    if (!nome) return {status: 400, mensagem:"O campo 'nome' é obrigatório."};
    if (!quantidade) return {status: 400, mensagem:"O campo 'quantidade' é obrigatório e deve ser maior que zero."};
    if (!preco) return {status: 400, mensagem:"O campo 'preco' é obrigatório."};
    if (!descricao) return {status: 400, mensagem:"O campo 'descricao' é obrigatório."};
}

module.exports = {
    verificaItensCadastroUsuario,
    verificaItensCadastroProduto
}