const menu = document.querySelector('.menu');
const botaoHamburguer = document.querySelector('.hamburguer');
const imagemBotao = document.querySelector('.hamburguer img');
const posts = document.querySelectorAll('.post')
const imagensGaleria = document.querySelectorAll('.post-img');
const modal = document.querySelector(".modal");
const imagemModal = document.querySelector(".modal-img");
const prev = document.querySelector(".seta-prev");
const next = document.querySelector(".seta-next");
const fechaModalBtn = document.querySelector(".fechar-modal img")
const likeModal = document.querySelector(".like-modal")

botaoHamburguer.addEventListener('click', mudarEstadoMenu)
imagensGaleria.forEach(x => {
    x.addEventListener('click', abrirModal)
})
fechaModalBtn.addEventListener('click', fecharModal)
imagemModal.addEventListener('dblclick', toggleLike)
prev.addEventListener('click', imagemAnterior)
next.addEventListener('click', proximaImagem)

function toggleLike(event) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].children[0].src === event.target.src) {
            if (posts[i].children[1].src.includes("/assets/like.svg")) {
                posts[i].children[1].src = "";
                likeModal.src = "";
            } else {
                posts[i].children[1].src = "./assets/like.svg";
                likeModal.src = "./assets/like.svg";
            }
            break
        }
    };
}

function abrirModal(event) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].children[0].src === event.target.src) {
            if (posts[i].children[1].src.includes("/assets/like.svg")) {
                likeModal.src = "./assets/like.svg";
            } else {
                likeModal.src = "";
            }
        }
    }
    imagemModal.src = event.target.src;
    modal.classList.remove('display-none');
    if (imagemModal.src.includes(imagensGaleria[imagensGaleria.length - 1].src)) {
        next.classList.add('display-none')
    } else {
        next.classList.remove('display-none')
    }
    if (imagemModal.src.includes(imagensGaleria[0].src)) {
        prev.classList.add('display-none')
    } else {
        prev.classList.remove('display-none')
    }
}

function fecharModal() {
    modal.classList.add('display-none');
}

function mudarEstadoMenu() {
    menu.classList.toggle('fechado')
    if (imagemBotao.src.includes('closed-menu.svg')) {
        imagemBotao.src = "./assets/open-menu.svg";
        return
    }
    if (imagemBotao.src.includes('open-menu.svg')) {
        imagemBotao.src = "./assets/closed-menu.svg";
        return
    }
}



function imagemAnterior() {
    for (let i = 0; i < imagensGaleria.length; i++) {
        if (imagensGaleria[i].src === imagemModal.src) {
            imagemModal.src = imagensGaleria[i - 1].src;
            next.classList.remove('display-none')
            if (imagemModal.src.includes(imagensGaleria[0].src)) {
                prev.classList.add('display-none')
            } else {
                prev.classList.remove('display-none')
            }
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].children[0].src === imagemModal.src) {
                    if (posts[i].children[1].src.includes("/assets/like.svg")) {
                        likeModal.src = "./assets/like.svg";
                    } else {
                        likeModal.src = "";
                    }
                }
            }
            break
        }
    };
}
function proximaImagem() {
    for (let i = 0; i < imagensGaleria.length; i++) {
        if (imagensGaleria[i].src === imagemModal.src) {
            imagemModal.src = imagensGaleria[i + 1].src;
            prev.classList.remove('display-none')
            if (imagemModal.src.includes(imagensGaleria[imagensGaleria.length - 1].src)) {
                next.classList.add('display-none')
            } else {
                next.classList.remove('display-none')
            }
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].children[0].src === imagemModal.src) {
                    if (posts[i].children[1].src.includes("/assets/like.svg")) {
                        likeModal.src = "./assets/like.svg";
                    } else {
                        likeModal.src = "";
                    }
                }
            }
            break
        }
    };
}