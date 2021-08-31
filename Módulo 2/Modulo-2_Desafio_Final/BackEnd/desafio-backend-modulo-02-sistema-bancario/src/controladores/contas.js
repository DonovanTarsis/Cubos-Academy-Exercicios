const bancoDeDados = require('../bancodedados');


const { validarDados, geradorDeId } = require('../servicos/servicos');

async function listarContas(req, res) {

    const senhaPassada = req.query.senha_banco

    const { senha } = bancoDeDados.banco
    const { contas } = bancoDeDados

    if (!senhaPassada || senhaPassada !== senha) {
        return res.status(400).json({
            mensagem: "Acesso não autorizado!"
        })
    }
    res.status(200).json(contas)
}




async function criarConta(req, res) {
    const contas = bancoDeDados.contas
    const body = req.body

    const { nome, cpf, data_nascimento, telefone, email, senha } = body

    const novaConta = {
        numero: `${geradorDeId()}`,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    const erro = validarDados(novaConta);
    if (erro) return res.status(400).json({ mensagem: erro })

    contas.splice((novaConta.numero - 1), 0, novaConta);
    res.status(201).json(novaConta);
}



async function atualizarUsuarioConta(req, res) {
    const contas = bancoDeDados.contas
    const body = req.body
    let conta = contas.find(x => x.numero === req.params.numeroConta)
    if (!conta) return res.status(404).json({ mensagem: 'A conta não foi encontrada!' })

    const { nome, cpf, data_nascimento, telefone, email, senha } = body

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) return res.status(400).json({ mensagem: 'É necessário informar ao menos um item a ser modificado!' })

    const novaConta = {
        numero: conta.numero,
        saldo: conta.saldo,
        usuario: {
            nome: nome ?? conta.usuario.nome,
            cpf: cpf ?? conta.usuario.cpf,
            data_nascimento: data_nascimento ?? conta.usuario.data_nascimento,
            telefone: telefone ?? conta.usuario.telefone,
            email: email ?? conta.usuario.email,
            senha: senha ?? conta.usuario.senha
        }
    }

    const erro = validarDados(novaConta);

    if (erro) return res.status(400).json({ mensagem: erro })

    conta.usuario.nome = novaConta.usuario.nome;
    conta.usuario.cpf = novaConta.usuario.cpf;
    conta.usuario.data_nascimento = novaConta.usuario.data_nascimento;
    conta.usuario.telefone = novaConta.usuario.telefone;
    conta.usuario.email = novaConta.usuario.email;
    conta.usuario.senha = novaConta.usuario.senha;

    res.status(201).json({mensagem:"Alteração realizada com sucesso."});
}



async function excluirConta(req, res) {
    const contas = bancoDeDados.contas
    const numero = req.params.numeroConta;
    if (!contas.find(x => x.numero === numero)) return res.status(404).json({ mensagem: 'A conta não foi encontrada!' })

    const index = contas.findIndex((x) => x.numero === numero);

    if (contas[index].saldo !== 0) return res.status(400).json({ mensagem: 'A conta não pode ser deletada pois ainda existe saldo!' })

    contas.splice(index, 1);
    res.status(200).json({ mensagem: "Conta excluída com sucesso!" })
}


module.exports = {
    listarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta
}
