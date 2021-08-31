const paises = document.querySelector('.paises');
const input = document.querySelector('input')
fetch('https://restcountries.eu/rest/v2/all').then(async (resposta) => {
    const body = await resposta.json();
    body.forEach(pais => {
        const divPais = document.createElement('div');
        const name = document.createElement('h2');
        const regiao = document.createElement('span');
        const capital = document.createElement('span');
        const populacao = document.createElement('p');
        const img = document.createElement('img');

        divPais.classList.add('pais');
        name.textContent = pais.name;
        regiao.textContent = pais.region;
        capital.textContent = pais.capital;
        populacao.textContent = pais.population;
        img.src = pais.flag;

        divPais.append(name, regiao, capital, populacao, img);
        paises.append(divPais)


    });
})

input.addEventListener('keydown', (event) => {
    if (event.key !== "Enter") {
        return
    }
    const listaPaises = document.querySelectorAll('.pais');
    listaPaises.forEach(div => {
        div.classList.remove('escondido')
        if (input.value.toLocaleLowerCase() == "all" || input.value.toLocaleLowerCase() == "todos") {
            return
        }
        const nome = div.children[0]
        if (nome.textContent.toLocaleLowerCase() !== input.value.toLocaleLowerCase()) {
            div.classList.add('escondido')
        }
    })

    input.value = ""

})