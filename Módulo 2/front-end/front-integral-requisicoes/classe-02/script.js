const entradaDeDados = document.querySelector('select');
const saidaMaiorValor = document.querySelector('.maior');
const saidaQtdNegociada = document.querySelector('.qtd-negociada');
const saidapreco = document.querySelector('.preco');

entradaDeDados.addEventListener('change', async ()=>{
    if(!entradaDeDados.value){
        saidaMaiorValor.textContent = "";
        saidaQtdNegociada.textContent = "";
        saidapreco.textContent = "";
        return
    }
    const moeda = entradaDeDados.value;
    const requisicao = await fetch(`https://www.mercadobitcoin.net/api/${moeda}/ticker/`);
    const body = await requisicao.json();
    const maiorValor = body.ticker.high;
    saidaMaiorValor.textContent = `R$${Number(maiorValor).toFixed(2)}`;
    saidaQtdNegociada.textContent = `${Number(body.ticker.vol).toFixed(2)}`;
    saidapreco.textContent = `R$${Number(body.ticker.buy).toFixed(2)}`;
})