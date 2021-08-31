const pokemon = document.querySelector('input');
const title = document.querySelector('.nome');
const img = document.querySelector('img')
const habilidade = document.querySelector('.habilidade');

pokemon.addEventListener('change', async ()=>{
    const idOrName = pokemon.value.toLowerCase();
    const requisicao = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}/`);
    if(!requisicao.ok){
        console.log('Erro');
        return
    }
    const body = await requisicao.json();
    console.log(body.abilities)
    const url = body.sprites.front_default;
    title.textContent = body.name;
    img.src = url;
    habilidade.textContent = body.abilities[0].ability.name;
})