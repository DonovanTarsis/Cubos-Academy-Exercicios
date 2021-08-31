const bancoDeDados = require('../bancodedados');
const { format } = require('date-fns');
const { acessarSaldoExtrato, validarDadosTransacoes } = require('../servicos/servicos');

async function depositar(req, res) {
    const depositos = bancoDeDados.depositos
    const contas = bancoDeDados.contas
    const body = req.body;
    const { numero_conta, valor } = body;

    const erro = validarDadosTransacoes(body, 'depositar')

    if (erro) {
        const status = erro.status
        const mensagem = erro.mensagem
        return res.status(status).json({ mensagem })
    }

    const conta = contas.find(x => x.numero === numero_conta);

    conta.saldo += valor

    depositos.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta,
        valor
    })
    res.status(200).json({
        mensagem: "Depósito realizado com sucesso!"
    })

}

async function sacar(req, res) {
    const saques = bancoDeDados.saques
    const contas = bancoDeDados.contas
    const body = req.body;
    const { numero_conta, valor, senha } = body;

    const erro = validarDadosTransacoes(body, 'sacar')

    if (erro) {
        const status = erro.status
        const mensagem = erro.mensagem
        return res.status(status).json({ mensagem })
    }

    const conta = contas.find(x => x.numero === numero_conta);

    conta.saldo -= valor

    saques.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta,
        valor
    })
    res.status(200).json({
        mensagem: "Saque realizado com sucesso!"
    })

}

async function transferir(req, res) {
    const transferencias = bancoDeDados.transferencias
    const contas = bancoDeDados.contas
    const body = req.body;
    const { numero_conta_origem, valor, numero_conta_destino } = body;

    const erro = validarDadosTransacoes(body, 'transferir')

    if (erro) {
        const status = erro.status
        const mensagem = erro.mensagem
        return res.status(status).json({ mensagem })
    }

    const conta_origem = contas.find(x => x.numero === numero_conta_origem);

    const conta_destino = contas.find(x => x.numero === numero_conta_destino);

    conta_origem.saldo -= valor;

    conta_destino.saldo += valor;

    transferencias.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem,
        numero_conta_destino,
        valor
    })
    res.status(200).json({ mensagem: "Transferência realizada com sucesso!" })

}



async function saldo(req, res) {

    const contas = bancoDeDados.contas
    const query = req.query;
    const { numero_conta } = query;

    const erro = acessarSaldoExtrato(query);

    if (erro) {
        const status = erro.status
        const mensagem = erro.mensagem
        return res.status(status).json({ mensagem })
    }

    const conta = contas.find(x => x.numero === numero_conta);

    res.status(200).json({ saldo: conta.saldo })

}

async function extrato(req, res) {

    const query = req.query;
    const { numero_conta } = query;

    const erro = acessarSaldoExtrato(query);

    if (erro) {
        const status = erro.status
        const mensagem = erro.mensagem
        return res.status(status).json({ mensagem })
    }

    const depositos = bancoDeDados.depositos.filter(conta => conta.numero_conta === numero_conta);
    const saques = bancoDeDados.saques.filter(conta => conta.numero_conta === numero_conta);
    const transferenciasEnviadas = bancoDeDados.transferencias.filter(conta => conta.numero_conta_origem === numero_conta);
    const transferenciasRecebidas = bancoDeDados.transferencias.filter(conta => conta.numero_conta_destino === numero_conta);

    res.status(200).json({
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas
    })
}

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}

