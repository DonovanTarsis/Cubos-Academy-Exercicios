const carrinho = {
    nomeDoCliente: "Guido Bernal",
    produtos: [
        {
            id: 1,
            nome: "Camisa",
            qtd: 3,
            precoUnit: 3000
        },
        {
            id: 2,
            nome: "Bermuda",
            qtd: 2,
            precoUnit: 5000
        }
    ],
    imprimirResumo: function (){
        console.log(`Cliente: ${this.nomeDoCliente}`)
        console.log(`Total de itens: ${(this.calcularTotalDeItens())} ${this.calcularTotalDeItens === 1 ? "item" : "itens"}`)
        console.log(`Valor dos itens: R$${(this.calcularTotalAPagar() / 100).toFixed(2)}`)
        console.log(`Desconto: R$${(this.calcularDesconto() / 100).toFixed(2)}`)
        console.log(`Total a pagar: R$${((this.calcularTotalAPagar() - this.calcularDesconto()) / 100).toFixed(2)}`);
    },
    addProduto: function (produto){
        let existe = false;
        for(let item of this.produtos){
            if(item.id === produto.id){
                item.qtd += produto.qtd;
                existe = true
                break
            }
        
        }if(!existe){
            this.produtos.push(produto);
        }
    },
    imprimirDetalhes: function() {
        console.log(`Cliente: ${this.nomeDoCliente}`)
        for(let item of this.produtos){
        console.log(`Item ${item.id} - ${item.nome} - ${item.qtd} und - R$${(item.precoUnit * item.qtd / 100).toFixed(2)}`);
        }console.log(`Total de itens: ${this.calcularTotalDeItens()} ${this.calcularTotalDeItens() === 1 ? "item" : "itens"}`);
        console.log(`Valor dos itens: R$${(this.calcularTotalAPagar() / 100).toFixed(2)}`)
        console.log(`Desconto: R$${(this.calcularDesconto() / 100).toFixed(2)}`)
        console.log(`Total a pagar: R$${((this.calcularTotalAPagar() - this.calcularDesconto()) / 100).toFixed(2)}`);
    },
    calcularTotalDeItens: function () {
        let totalItens = 0;
        for(let item of this.produtos){
            totalItens += item.qtd;
        }
        return totalItens;
    },
    calcularTotalAPagar: function (){
        let totalPagar = 0;
        for(let item of this.produtos){
            totalPagar += item.precoUnit * item.qtd;
        }
        return totalPagar;
    },
    calcularDesconto: function () {
        let itemMaisBarato = 0;
        let dezPorCento = 0;
        let desconto = 0;
        if (this.calcularTotalDeItens() > 4){
            itemMaisBarato = this.produtos[0].precoUnit;
            for (const item of this.produtos) {
                if(item.precoUnit < itemMaisBarato){
                    itemMaisBarato = item.precoUnit
                }
            }
        }if (this.calcularTotalAPagar() > 10000){
            dezPorCento = this.calcularTotalAPagar() * 0.1;
        }
        if (itemMaisBarato > dezPorCento){
            desconto = itemMaisBarato;
        }else{
            desconto = dezPorCento;
        }
        return desconto;
    }
}
carrinho.imprimirResumo();
carrinho.imprimirDetalhes();
