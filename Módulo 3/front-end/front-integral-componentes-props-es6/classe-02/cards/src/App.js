import './App.css';
import kelvin from './assets/kelvin-costa.png'
import charles from './assets/charles-santos.png'
import anna from './assets/anna-bia.png'
import mario from './assets/mario-hisashi.png'


function Card({src, nome, id, seguidores, seguindo}){
  return (
    <div className="card">
          <img src={src} alt="foto de perfil" />
        <p className="name">{nome}</p>
        <p className="id">{id}</p>
        <p className=" dados seguidores">{seguidores} seguidores</p>
        <p className="dados seguindo">{seguindo} seguindo</p>
      </div>
  )
}


function App() {
  const usuarios = [
    { src: kelvin, nome: "Kelvin Costa", id: "@costa", seguidores: 140, seguindo: 207 },
    { src: charles, nome: "Charles Santos", id: "@charles.santos", seguidores: 302, seguindo: 419 },
    { src: anna, nome: "Anna Bia", id: "@anab", seguidores: 842, seguindo: 150 },
    { src: mario, nome: "Mario Hisashi", id: "@hisashi", seguidores: 28, seguindo: 17 },

  ]


  return (
    <div className="App">
      {usuarios.map(({src, nome, id, seguidores, seguindo}) =>{
        return <Card  src={src} nome={nome} id={id} seguidores={seguidores} seguindo={seguindo}/>
      })}
    </div>
  );
}

export default App;
