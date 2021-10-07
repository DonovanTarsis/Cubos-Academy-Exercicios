import { useState } from 'react';
import kelvin from './assets/kelvin-costa.png';
import './App.css';

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

function Button({func, className, children }) {
  return <button onClick={func} className={className}>{children}</button>
}

function App() {
  const usuarios = [
    { src: kelvin, nome: "Kelvin Costa", id: "@costa", seguidores: 140, seguindo: 207 }
  ]
  const [estado, setEstado] = useState("")
  const [seguidores, setSeguidores] = useState(usuarios[0].seguidores)


  function curti () {
    setSeguidores(estado === "like" ? seguidores-1 : seguidores+1)
    setEstado(estado === "like" ? "" : "like")
  }



  return (
    <div className="App">
      {usuarios.map(({src, nome, id, seguindo}) =>{
        return (
          <>
          <Card src={src} nome={nome} id={id} seguidores={seguidores} seguindo={seguindo} />
          <Button className={`button ${estado}`} func={curti}>{estado === "like" ? "SEGUINDO" : "SEGUIR" }</Button>
          </>
        )
      })}
    </div>
  );
}

export default App;
