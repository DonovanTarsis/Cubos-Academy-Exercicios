const inputCep = document.querySelector('#cep');
const cidade = document.querySelector('#cidade');
const uf = document.querySelector('#uf');
const rua = document.querySelector('#rua');
const modal = document.querySelector('.modal')

inputCep.addEventListener('change', async ()=>{
    if(inputCep.value.length !== 8){
        console.log('Erro');
        modal.classList.remove('display-none')
        cidade.value = "";
        uf.value = "";
        rua.value = "";
        return
    }
    const cep = inputCep.value.toLowerCase();
    const requisicao = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if(!requisicao.ok){
        console.log('Erro');
        modal.classList.remove('display-none')
        cidade.value = "";
        uf.value = "";
        rua.value = "";
        return
    }
    modal.classList.add('display-none')
    const body = await requisicao.json();
    if(body.erro){
        console.log('Erro');
        modal.classList.remove('display-none')
        cidade.value = "";
        uf.value = "";
        rua.value = "";
        return
    }
    cidade.value = body.localidade;
    uf.value = body.uf;
    rua.value = body.logradouro;
})