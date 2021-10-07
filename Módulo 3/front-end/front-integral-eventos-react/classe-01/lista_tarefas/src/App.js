import { useState } from 'react'
import './App.css';
import btnDelete from './assets/delete.svg'

function Ul({ mostrar, lista, apaga, completar }) {
  let itens = [];
  if (mostrar === 'Todas') {
    itens = lista
  } else if (mostrar === 'Ativas') {
    itens = lista.filter(tarefa => !tarefa.completa)
  } else {
    itens = lista.filter(tarefa => tarefa.completa)
  }
  return (
    <ul>
      {itens.map(item => {
        return (
          <li className="item">
            <span className={item.completa ? "feito" : ""} onClick={() => { completar(item.id) }}>
              {item.tarefa}
            </span>
            <img src={btnDelete} onClick={() => { apaga(item.id) }} alt="" />
          </li>
        )
      })}
    </ul>
  )
}

function Span({ mostrar, func, children }) {
  return (
    <span className={mostrar === children ? 'btn selecionado' : 'btn'} onClick={() => func(children)}>{children}</span>
  )
}

let contador = 1;
function App() {
  const [listaGeral, setListaGeral] = useState([]);
  const [mostrar, setMostrar] = useState('Todas');
  const [restantes, setRestantes] = useState(0);

  function handleKeyDown(event) {
    if (event.key !== "Enter") return

    if (!event.target.value) return

    const listaNova = [...listaGeral, { id: contador, tarefa: event.target.value, completa: false }]
    setListaGeral(listaNova)
    event.target.value = ""
    contador++
    setRestantes(restantes + 1)
  }

  function handleDelete(id) {
    const item = listaGeral.find(tarefa => tarefa.id === id)

    const listaNova = listaGeral.filter(tarefa => tarefa.id !== id)
    setListaGeral(listaNova)
    if (item.completa) {
      return
    }
    setRestantes(restantes - 1)
  }

  function handleDeleteAll() {
    const listaNova = listaGeral.filter(tarefa => !tarefa.completa)
    setListaGeral(listaNova)
  }

  function handleCompletar(id) {
    const listaNova = [...listaGeral];
    const item = listaNova.find(tarefa => tarefa.id === id);
    if (item.completa) {
      item.completa = false;
    } else {
      item.completa = true;
    }
    setListaGeral(listaNova);
    const listaRestantes = listaGeral.filter(tarefa => !tarefa.completa)
    setRestantes(listaRestantes.length)
  }

  return (
    <div className="App">
      <h1>TAREFAS</h1>
      <input placeholder="Criar uma nova tarefa" type="text" onKeyDown={handleKeyDown} />
      <div className="tarefas">
        <Ul mostrar={mostrar} lista={listaGeral} apaga={handleDelete} completar={handleCompletar}></Ul>
        <div className="footer">
          <span className="contador">{restantes} itens restantes</span>
          <div className="btns">
            <Span mostrar={mostrar} func={setMostrar}>Todas</Span>
            <Span mostrar={mostrar} func={setMostrar}>Ativas</Span>
            <Span mostrar={mostrar} func={setMostrar}>Completada</Span>
          </div>
          <span className="limpar" onClick={handleDeleteAll}>Limpar Completadas</span>
        </div>
      </div>
    </div>

  );
}

export default App;
