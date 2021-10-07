import './App.css';
import { useState } from 'react';
import openedMenu from './assets/open-menu.svg';
import closedMenu from './assets/closed-menu.svg';
import activeHome from './assets/active-home.svg';
import inactiveLike from './assets/inactive-like.svg';
import inactiveSetings from './assets/inactive-settings.svg';
import hamster from './assets/gallery/image 1.png';
import gato from './assets/gallery/image 2.png';
import huski from './assets/gallery/image 3.png';
import macaco from './assets/gallery/image 4.png';
import borboleta from './assets/gallery/image 5.png';
import oncaPintada from './assets/gallery/image 6.png';
import raposaVermelha from './assets/gallery/image 7.png';
import raposaNeve from './assets/gallery/image 8.png';
import tartaruga from './assets/gallery/image 9.png';
import leao from './assets/gallery/image 10.png';
import like from './assets/like.svg'
import closeModal from './assets/close-modal.svg'
import prev from './assets/prev.svg'
import next from './assets/next.svg'

function Post({ func, src, alt, liked, legenda, tempo }) {
  return (
    <div className="post">
      <img className="post-img" src={src} alt={alt} onClick={func} />
      <img className={liked ? "like" : "like hiden"} src={like} alt="like" />
      <div className="legenda">
        <h4>{legenda}</h4>
        <h5>{tempo}</h5>
      </div>
    </div>
  )
}

function App() {
  const [menu, setMenu] = useState("menu fechado")
  const [posts, setPosts] = useState([
    { src: hamster, alt: 'hamster', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 1 },
    { src: gato, alt: 'Gato', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 2 },
    { src: huski, alt: 'Huski', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 3 },
    { src: macaco, alt: 'Macaco', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 4 },
    { src: borboleta, alt: 'Borboleta', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 5 },
    { src: oncaPintada, alt: 'Onça Pintada', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 6 },
    { src: raposaVermelha, alt: 'Raposa Vermelha', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 7 },
    { src: raposaNeve, alt: 'Raposa Neve', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 8 },
    { src: tartaruga, alt: 'Tartaruga', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 9 },
    { src: leao, alt: 'leao', liked: false, legenda: 'Lorem ipsum', tempo: 'há 1 mês', id: 10 }
  ]);
  const [modal, setModal] = useState({})
  const [modalAberto, setModalAberto] = useState(false)
  const [index, setIndex] = useState(0)

  function handleOpenMenu() {
    setMenu(menu === "menu" ? "menu fechado" : "menu")
  }

  function handleOpenModal(event) {
    setModalAberto(true);
    console.log(event.target.alt)
    const objeto = posts.find(item => item.alt === event.target.alt);
    const novoIndex = posts.findIndex(item => item.alt === event.target.alt);
    setModal(objeto);
    setIndex(novoIndex)
  }

  function handleImagemAnterior() {
    let novoModal;
    let novoIndex;
    if (index === 0) {
      novoModal = posts[posts.length - 1]
      novoIndex = posts.length - 1;
    } else {
      novoModal = posts[index - 1]
      novoIndex = index - 1;
    }
    setModal(novoModal);
    setIndex(novoIndex);
  }
function handleProximaImagem() {
  let novoModal;
  let novoIndex;
  if (index === posts.length - 1) {
    novoModal = posts[0]
    novoIndex = 0;
  } else {
    novoModal = posts[index + 1]
    novoIndex = index + 1;
  }
  setModal(novoModal);
  setIndex(novoIndex);
}

function handleCurtir() {
  const listaNova = [...posts];
  const item = listaNova.find(post => post.alt === modal.alt);
  if (item.liked) {
    item.liked = false;
  } else {
    item.liked = true;
  }
  setPosts(listaNova);
  setModal(item);
}



return (
  <div className="App">
    <aside className={menu}>
      <button className="hamburguer" onClick={handleOpenMenu}>
        <img src={menu === "menu" ? openedMenu : closedMenu} alt="Menu fechado" />
      </button>
      <button className="home">
        <img src={activeHome} alt="Home" />
        <h3 className="color-branco opcoes-home">Início</h3>
      </button>
      <button>
        <img src={inactiveLike} alt="Favoritos" />
        <h3 className="opcoes-favoritos">Favoritos</h3>
      </button>
      <button className="settings">
        <img src={inactiveSetings} alt="Configurações" />
        <h3 className="opcoes-settings">Configurações</h3>
      </button>
    </aside>
    <section className="principal">
      <h1>Início</h1>
      <div className="galeria">
        {posts.map(post => {
          const { src, alt, liked, legenda, tempo, id } = post;
          return (
            <Post func={handleOpenModal} src={src} alt={alt} liked={liked} legenda={legenda} tempo={tempo} key={id} />
          )
        })}
      </div>
    </section>
    <div className={modalAberto === true ? "modal" : "modal hiden"} onClick={() => { setModalAberto(false) }}>
      <div className="fechar-modal">
        <img src={closeModal} onClick={() => { setModalAberto(false) }} alt="close modal" />
      </div>

      <img className="seta-prev" src={prev} onClick={(event) => {
        event.stopPropagation()
        handleImagemAnterior()
        }} alt="prev" />

      <div className="modal-principal">
        <img className="modal-img" src={modal.src} onClick={(event) => event.stopPropagation()} onDoubleClick={handleCurtir} alt={modal.alt} />
        <img className={modal.liked ? "like like-modal" : "like like-modal hiden"} src={like} alt="like" />
      </div>

      <img className="seta-next" src={next} onClick={(event) => {
        event.stopPropagation()
        handleProximaImagem()
        }} alt="next" />

    </div>
  </div>
);
}

export default App;
