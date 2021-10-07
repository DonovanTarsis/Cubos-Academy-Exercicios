import './App.css';
import { useEffect, useState } from 'react';

function CardPais ({nome, bandeira}) {

  return(
    <div className="pais">
      <img src={bandeira} alt="nome" />
      <h1>{nome}</h1>
    </div>
  )
}


function App() {
  const [pesquisa, setPesquisa] = useState('')
  const [paises, setPaises] = useState([])
  const [mostrar, setMostrar] = useState([])

  useEffect(() => {
    fetch('https://restcountries.com/v3/all')
    .then(resposta => resposta.json())
    .then(body=>setPaises(body))
  }, [])

  useEffect(() => {
    if(pesquisa){
      setMostrar(paises.filter(pais => pais.name.common.includes(pesquisa)))
    }else{
      setMostrar(paises)
    }
  }, [pesquisa, paises])


  return (
    <div className="App">
      <input type="text" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
      {
      mostrar.map(pais => {
        return <CardPais nome={pais.name.common} bandeira={pais.flags[0]}></CardPais>
      })
      }
    </div>
  );
}

export default App;
