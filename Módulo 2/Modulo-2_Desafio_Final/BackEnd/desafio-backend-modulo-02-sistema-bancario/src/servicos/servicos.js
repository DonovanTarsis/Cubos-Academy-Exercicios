const bancoDeDados = require('../bancodedados');
const { parse, isDate } = require('date-fns');

const geradorDeId = () => {
    const contas = bancoDeDados.contas;
    let contador = 1;
    if (contas.length === 0 || contas.length == contas[contas.length - 1].numero) {

        contador = contas.length + 1

        return contador
    }
    while (true) {
        if (contas.find(x => x.numero == contador)) {
            contador++
        } else {
            return contador
        }
    }

}

const validarDados = (objeto) => {
    const contas = bancoDeDados.contas
    if (!objeto.usuario.nome) return "O campo 'nome' é obrigatório.";
    if (!objeto.usuario.cpf) return "O campo 'cpf' é obrigatório.";
    if (!objeto.usuario.data_nascimento) return "O campo 'data_nascimento' é obrigatório.";
    if (!objeto.usuario.telefone) return "O campo 'telefone' é obrigatório.";
    if (!objeto.usuario.email) return "O campo 'email' é obrigatório.";
    if (!objeto.usuario.senha) return "O campo 'senha' é obrigatório.";
    if (typeof objeto.usuario.nome !== "string") return "O campo 'nome' deve ser preenchido com um texto.";
    /* if(!isDate(parse(objeto.usuario.data_nascimento, 'yyyy-MM-dd', new Date()))) return "O campo 'data_nascimento' deve ser preenchido com uma data."; */
    for (let item of contas) {
        if (item.numero !== objeto.numero) {

            if (item.usuario.cpf === objeto.usuario.cpf) {
                return 'Já existe uma conta que utiliza este CPF!'
            }
            if (item.usuario.email === objeto.usuario.email) {
                return 'Já existe uma conta que utiliza este e-mail!'
            }

        }
    }
}


const acessarSaldoExtrato = (query) => {
    const contas = bancoDeDados.contas

    const { numero_conta, senha } = query;

    if (!numero_conta) return { status: 400, mensagem: "É necessário informar o número da conta!" };

    if (!senha) return { status: 400, mensagem: "É necessário informar a senha da conta!" };

    if (!contas.find(x => x.numero === numero_conta)) return { status: 404, mensagem: "A conta não foi encontrada!" };

    const conta = contas.find(x => x.numero === numero_conta);

    if (conta.usuario.senha !== senha) return { status: 400, mensagem: "Acesso negado!" };
}


const validarDadosTransacoes = (body, operacao) => {
    const contas = bancoDeDados.contas
    if (operacao === 'depositar' || operacao === 'sacar') {
        const { numero_conta, valor } = body;

        if (!numero_conta) return { status: 400, mensagem: "É necessário informar o número da conta!" };

        if (!valor) return { status: 400, mensagem: "É necessário informar o valor!" };

        if (!contas.find(x => x.numero === numero_conta)) return { status: 404, mensagem: "A conta não foi encontrada!" };

    }


    if (operacao === 'sacar') {
        const { numero_conta, valor, senha } = body;

        if (!senha) return { status: 400, mensagem: "É necessário informar a senha da conta!" };

        const conta = contas.find(x => x.numero === numero_conta);

        if (conta.usuario.senha !== senha) return { status: 400, mensagem: "Acesso negado!" };

        if (conta.saldo < valor) return { status: 400, mensagem: "Saldo insuficiente!" };

    }


    if (operacao === 'transferir') {
        const { numero_conta_origem, valor, senha, numero_conta_destino } = body;

        if (!numero_conta_origem) return { status: 400, mensagem: "É necessário informar o número da conta de origem!" };

        if (!numero_conta_destino) return { status: (400), mensagem: "É necessário informar o número da conta de destino!" };

        if (!valor) return { status: (400), mensagem: "É necessário informar o valor do depósito!" };

        if (!senha) return { status: (400), mensagem: "É necessário informar a senha da conta!" };

        if (!contas.find(x => x.numero === numero_conta_origem)) return { status: (404), mensagem: "A conta de origem não foi encontrada!" };

        const conta_origem = contas.find(x => x.numero === numero_conta_origem);

        if (!contas.find(x => x.numero === numero_conta_destino)) return { status: (404), mensagem: "A conta de destino não foi encontrada!" };

        if (conta_origem.usuario.senha !== senha) return { status: (400), mensagem: "Acesso negado!" };

        if (conta_origem.saldo < valor) return { status: (400), mensagem: "Saldo insuficiente!" };

    }

}

module.exports = {
    geradorDeId,
    validarDados,
    acessarSaldoExtrato,
    validarDadosTransacoes
}