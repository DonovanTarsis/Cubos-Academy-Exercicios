import './App.css';
import closedMenu from './assets/closed-menu.svg'
import activeHome from './assets/active-home.svg'
import inactiveLike from './assets/inactive-like.svg'
import inactiveSetings from './assets/inactive-settings.svg'
import hamster from './assets/gallery/image 1.png'
import gato from './assets/gallery/image 2.png'
import huski from './assets/gallery/image 3.png'
import macaco from './assets/gallery/image 4.png'
import borboleta from './assets/gallery/image 5.png'
import oncaPintada from './assets/gallery/image 6.png'
import raposaVermelha from './assets/gallery/image 7.png'
import raposaNeve from './assets/gallery/image 8.png'
import tartaruga from './assets/gallery/image 9.png'
import leao from './assets/gallery/image 10.png'



function App() {
  return (
    <div className="div_nova">
      <aside className="menu fechado">
        <button className="hamburguer">
          <img src={closedMenu} alt="Menu fechado" />
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
          <div className="post">
            <img className="post-img" src={hamster} alt="Hamster" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={gato} alt="Gato" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={huski} alt="Huski" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={macaco} alt="Macaco" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={borboleta} alt="Borboleta" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={oncaPintada} alt="Onça-pintada" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={raposaVermelha} alt="Raposa Vermelha" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={raposaNeve} alt="Raposa da Neve" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={tartaruga} alt="Tartaruga Marinha" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
          <div className="post">
            <img className="post-img" src={leao} alt="Leão" />
            <img className="like" />
            <div className="legenda">
              <h4>Lorem ipsum</h4>
              <h5>há 1 mês</h5>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

export default App;
