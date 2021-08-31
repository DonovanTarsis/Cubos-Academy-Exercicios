const body = document.querySelector('body');
const movies = document.querySelector('.movies');
const input = document.querySelector('.input');
const arrowLeft = document.querySelector('.btn-prev');
const arrowRight = document.querySelector('.btn-next');
const modal = document.querySelector('.modal');
const btnFechaModal = document.querySelector('.modal__close');
const btnTema = document.querySelector('.btn-theme')
const temaAtual = localStorage.getItem('tema');
const index = 0;

temaAtual === 'dark' ? setTemaDark() : setTemaLight();

const home = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false'


let moviesList = requireList(home)


carregarCarrosel(moviesList, index)
carregarFilmeDoDia()

arrowLeft.addEventListener('click', telaAnterior)
arrowRight.addEventListener('click', proximaTela)
input.addEventListener('keydown', pesquisa)
btnTema.addEventListener('click', trocaTema)

modal.addEventListener('click', fecharModal)
btnFechaModal.addEventListener('click', fecharModal)

for (const item of modal.children) {
    item.addEventListener('click', stopPropagation)
}



async function carregarCarrosel(filmes, index) {
    const lista = await filmes

    const allMovies = document.querySelectorAll('.movie')
    for (let item of allMovies) {
        item.remove()
    }

    for (let i = index; i < index + 5; i++) {
        if (i >= lista.length) break
        const item = lista[i]
        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.style.backgroundImage = `url(${item.poster_path})`
        movie.id = item.id

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie__info');

        const movieTitle = document.createElement('span');
        movieTitle.classList.add('movie__title');
        movieTitle.textContent = item.title

        const movieRating = document.createElement('span');
        movieRating.classList.add('movie__rating');

        const img = document.createElement('img')
        img.src = "./assets/estrela.svg";
        img.alt = "Estrela"

        movieRating.append(img, item.vote_average)
        movieInfo.append(movieTitle, movieRating)
        movie.append(movieInfo)
        movies.append(movie)
        movie.addEventListener('click', carregarModal)
        movieInfo.addEventListener('click', stopPropagation)
    }
}

async function carregarFilmeDoDia() {
    const geral = await requireGeral('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR')
    const EndPointVideo = await requireList('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR')

    const highlightVideo = document.querySelector('.highlight__video')
    highlightVideo.style.backgroundImage = `url(${geral.backdrop_path})`
    const highlightTitle = document.querySelector('.highlight__title')
    highlightTitle.textContent = geral.title

    const highlightRating = document.querySelector('.highlight__rating')
    highlightRating.textContent = geral.vote_average

    const highlightGenres = document.querySelector('.highlight__genres')
    const generos = [];
    for (let item of geral.genres) {
        generos.push(item.name);
    }
    highlightGenres.textContent = generos.join(', ')

    const highlightLaunch = document.querySelector('.highlight__launch')
    const ano = geral.release_date.substr(0, 4);
    const dia = geral.release_date.substr(8, 2);
    let mes = geral.release_date.substr(5, 2);
    switch (mes) {
        case "01": mes = "janeiro"; break;
        case "02": mes = "fevereiro"; break;
        case "03": mes = "março"; break;
        case "04": mes = "abril"; break;
        case "05": mes = "maio"; break;
        case "06": mes = "junho"; break;
        case "07": mes = "julho"; break;
        case "08": mes = "agosto"; break;
        case "09": mes = "setembro"; break;
        case "10": mes = "outubro"; break;
        case "11": mes = "novembro"; break;
        case "12": mes = "dezembro"; break;
    }
    const data = dia + " de " + mes + " de " + ano;
    highlightLaunch.textContent = data

    const highlightDescription = document.querySelector('.highlight__description')
    highlightDescription.textContent = geral.overview

    const highlightVideoLink = document.querySelector('.highlight__video-link')
    highlightVideoLink.href = `https://www.youtube.com/watch?v=${EndPointVideo[0].key}`


}

async function requireList(link) {
    const promise = await fetch(link)

    const body = await promise.json()
    const lista = await body.results

    return lista
}

async function requireGeral(link) {
    const promise = await fetch(link)

    const body = await promise.json()
    const lista = await body

    return lista
}

async function telaAnterior() {
    const lista = await moviesList;
    const allMovies = document.querySelectorAll('.movie')
    let index = 0;
    for (let i = 0; i < lista.length; i++) {
        if (allMovies[0].id == lista[i].id) {
            if (lista.length % 5 !== 0) {
                for (let j = 0; j < lista.length; j++) {
                    if (allMovies[allMovies.length - 1].id == lista[j].id) {
                        if (i === 0 && j === lista.length - 1) {
                            index = 0
                            break
                        } else if (i === 0) {
                            index = lista.length - (lista.length % 5)
                            break
                        } else {
                            index = i - 5
                            break
                        }
                    }
                };
            } else {
                if (i === 0) {
                    index = lista.length - 5
                    break
                } else {
                    index = i - 5
                    break
                }
            }

            break
        }
    };
    carregarCarrosel(lista, index)
}

async function proximaTela() {
    const lista = await moviesList;
    const allMovies = document.querySelectorAll('.movie')
    let index = 0;
    for (let i = 0; i < lista.length; i++) {
        if (allMovies[allMovies.length - 1].id == lista[i].id) {
            if (i === lista.length - 1) {
                index = 0
                break
            } else {
                index = i + 1
                break
            }
        }
    };
    carregarCarrosel(lista, index)
}

async function pesquisa(event) {

    if (event.key !== 'Enter') {
        return
    }

    if (!input.value) {
        moviesList = requireList(home)
        carregarCarrosel(moviesList, index)
    } else {
        const urlBusca = `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`;
        input.value = ''
        moviesList = requireList(urlBusca)
        carregarCarrosel(moviesList, index)
    }
}

async function carregarModal(event) {
    const allGenre = document.querySelectorAll('.modal__genre');
    for (let item of allGenre) {
        item.remove()
    }
    const filme = await requireGeral(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${event.target.id}?language=pt-BR`)
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = filme.title;

    const modalGenres = document.querySelector('.modal__genres')
    const modalImg = document.querySelector('.modal__img');
    modalImg.src = filme.backdrop_path
    const modalDescription = document.querySelector('.modal__description');
    modalDescription.textContent = filme.overview
    const modalAverage = document.querySelector('.modal__average');
    modalAverage.textContent = filme.vote_average

    for (let genre of filme.genres) {
        const span = document.createElement('span')
        span.classList.add('modal__genre')
        span.textContent = genre.name
        modalGenres.append(span)
    }

    modal.classList.remove('hidden')
}

async function fecharModal() {
    modal.classList.add('hidden')
}

async function stopPropagation(event) {
    event.stopPropagation()
}

async function trocaTema() {
    localStorage.getItem('tema') === 'dark' ? setTemaLight() : setTemaDark()
}

async function setTemaLight() {
    localStorage.setItem('tema', 'light')

    btnTema.src = './assets/light-mode.svg'
    arrowLeft.src = './assets/seta-esquerda-preta.svg'
    arrowRight.src = './assets/seta-direita-preta.svg'

    body.style.setProperty('--background-color', '#fff');
    body.style.setProperty('--input-color', '#979797');
    body.style.setProperty('--title-description-color', '#000');
    body.style.setProperty('--background-info-highlight', '#fff');
    body.style.setProperty('--shadow-color', '#00000026');
    body.style.setProperty('--rating-color', '#A785ED');
    body.style.setProperty('--genre-launch-color', '#000000B2');
}

async function setTemaDark() {
    localStorage.setItem('tema', 'dark')

    btnTema.src = './assets/dark-mode.svg'
    arrowLeft.src = './assets/seta-esquerda-branca.svg'
    arrowRight.src = './assets/seta-direita-branca.svg'

    body.style.setProperty('--background-color', '#242424');
    body.style.setProperty('--input-color', '#fff');
    body.style.setProperty('--title-description-color', '#fff');
    body.style.setProperty('--background-info-highlight', '#454545');
    body.style.setProperty('--shadow-color', '#FFFFFF26');
    body.style.setProperty('--rating-color', '#A987ED');
    body.style.setProperty('--genre-launch-color', '#FFFFFFB2');
}


/* 
async function setTema() {
    temaAtual = localStorage.getItem('tema');
    
    btnTema.src = temaAtual === 'dark'? './assets/light-mode.svg' : './assets/dark-mode.svg';
    arrowLeft.src = temaAtual === 'dark'?  './assets/seta-esquerda-preta.svg' : './assets/seta-esquerda-branca.svg';
    arrowRight.src = temaAtual === 'dark'?  './assets/seta-direita-preta.svg' : './assets/seta-direita-branca.svg' ;
    
    body.style.setProperty('--background-color', temaAtual === 'dark'? '#fff' :  '#242424');
    body.style.setProperty('--input-color', temaAtual === 'dark'? '#979797' : '#fff');
    body.style.setProperty('--title-description-color', temaAtual === 'dark'? '#000' : '#fff');
    body.style.setProperty('--background-info-highlight', temaAtual === 'dark'? '#fff' : '#454545');
    body.style.setProperty('--shadow-color', temaAtual === 'dark'? '#00000026' : '#FFFFFF26');
    body.style.setProperty('--rating-color', temaAtual === 'dark'? '#A785ED' : '#A987ED');
    body.style.setProperty('--genre-launch-color', temaAtual === 'dark'? '#000000B2' : '#FFFFFFB2');
    localStorage.setItem('tema', temaAtual === 'dark'? 'light' : 'dark')
} */