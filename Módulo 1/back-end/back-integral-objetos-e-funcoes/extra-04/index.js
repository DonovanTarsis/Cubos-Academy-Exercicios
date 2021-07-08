const contaBancaria = {
    nome: "Maria",
    saldo: 0,
    historicos: [],
    depositar: function(valor){
        this.saldo += valor;
        const registro = {
            tipo: "Depósito",
            valor: valor
        }
        this.historicos.push(registro);
        console.log(`Deposito de R$${(valor / 100).toFixed(2)} realizado para o cliente: ${this.nome}.`);
    },
    sacar: function (valor){
        if (valor > this.saldo){
            console.log(`Saldo insuficiente para o saque de: ${this.nome}.`);
        }else{
            this.saldo -= valor;
            registro = {
                tipo: "Saque",
                valor: valor
            }
            this.historicos.push(registro);
        }console.log(`Saque de R$${(valor / 100).toFixed(2)} realizado para o cliente: ${this.nome}.`);
    },
    extrato: function (){
        console.log(`Extrato de ${this.nome} - Saldo: R$${this.saldo}`);
        console.log("Histórico:");
        for (let item of this.historicos) {
            console.log(`${item.tipo} de $${(item.valor / 100).toFixed(2)}`);
        }
    }
}

contaBancaria.depositar(10000);
contaBancaria.sacar(50000);
contaBancaria.sacar(5000);
contaBancaria.extrato();
