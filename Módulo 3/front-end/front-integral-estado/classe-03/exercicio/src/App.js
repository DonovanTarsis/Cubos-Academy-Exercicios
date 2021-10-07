import { useState } from 'react';

import './App.css';

import comida from './assets/hamburguer.png';

function Card ({funcMenos, funcMais, src, title, text, pedidos}) {
  return(
    <div className="card">
      <img className="img"  src={src} alt={title}/>
      <h1 className="name">{title}</h1>
      <p>{text}</p>
      <div className="pedido">
        <button className="button" onClick={funcMenos}>-</button>
        <h1 className="quant">{pedidos}</h1>
        <button className="button" onClick={funcMais}>+</button>
      </div>
    </div>
  )
}


function App() {
  const [quantidade, setQuantidade] = useState(0)

  function menos () {
    if (quantidade === 0){
      return
    }
    setQuantidade(quantidade - 1)
  }

  function mais () {
    setQuantidade(quantidade + 1)
  }
  return (
    <div className="App">
      <Card funcMenos={menos} funcMais={mais} src={comida} title={'Hamburguer'} text={'Arcu, sagittis, ut lectus congue dapibus semper odio a, lobortis.'} pedidos={quantidade}></Card>
    </div>
  );
}

export default App;
