import './App.css';
import { useEffect, useState } from 'react';
import filtro from './assets/filtro.svg';
import Registro from './componentes/registro';
import Modal from './componentes/modal/index';
import Header from './componentes/header/index';
import Resume from './componentes/resume/index';
import Filter from './componentes/filtro/index';
import TableHead from './componentes/table-head/index';

function App() {
  const [resumeValues, setResumeValues] = useState({})
  const [categorias, setCategorias] = useState([])
  const [registros, setRegistros] = useState([])
  const [mostrar, setMostrar] = useState([])
  const [filtroSetings, setFiltroSetings] = useState({
    aberto: false,
    dias: [],
    tags: [],
    min: '',
    max: '',
    aply: false
  })

  const [diasFiltro] = useState([
    { nome: "Domingo", tipo: "dia" },
    { nome: "Segunda", tipo: "dia" },
    { nome: "Terça", tipo: "dia" },
    { nome: "Quarta", tipo: "dia" },
    { nome: "Quinta", tipo: "dia" },
    { nome: "Sexta", tipo: "dia" },
    { nome: "Sábado", tipo: "dia" }
  ]);

  const [modalValues, setModalValues] = useState({
    id: "",
    aberto: false,
    title: "Adicionar",
    tipo: "debit",
    valor: "",
    categoria: "",
    data: "",
    descricao: ""
  })

  async function requireTransactions() {
    try {
      const response = await fetch('http://localhost:3333/transactions', {
        method: 'GET'
      });
  
      const data = await response.json();
      setRegistros(data)
      let allCategorias = [];
      for (let item of data) {
        allCategorias.push(item.category)
      };
  
      allCategorias = allCategorias.filter(function (item, i) {
        return allCategorias.indexOf(item) === i;
      });
      const novasCategorias = allCategorias.map(item => {
        return { nome: item, tipo: "tag" }
      })
      setCategorias(novasCategorias);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    requireTransactions()
  }, [])

  function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(valor);
  }

  function mascaraMoeda(value) {
    value = value.toString();
    const onlyDigits = value
      .split("")
      .filter(s => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    return maskCurrency(digitsFloat);
  }

  useEffect(() => {
    let novaLista = [...registros]
    if(filtroSetings.aply){
      if(filtroSetings.dias.length > 0){
        const dias = filtroSetings.dias.join(' ')
        novaLista = novaLista.filter(item => dias.includes(item.week_day))
      }
      if(filtroSetings.tags.length > 0){
        const tags = filtroSetings.tags.join(' ')
        novaLista = novaLista.filter(item => tags.includes(item.category))
      }
      if(filtroSetings.min !== '' && filtroSetings.min !== "R$ 0,00"){
        const valor = filtroSetings.min;
        let value = valor.replace('R$', '').replace(',', '');
        while (value.includes(".")) {
            value = value.replace('.', '')
        }
        value = Number(value)
        novaLista = novaLista.filter(item => item.value >= value )
      }
      if(filtroSetings.max !== '' && filtroSetings.max !== "R$ 0,00"){
        const valor = filtroSetings.max;
        let value = valor.replace('R$', '').replace(',', '');
        while (value.includes(".")) {
            value = value.replace('.', '')
        }
        value = Number(value)
        novaLista = novaLista.filter(item => item.value <= value )
      }
    }
    setMostrar(novaLista)
  }, [filtroSetings, registros])

  useEffect(() => {
    function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      }).format(valor);
    }

    function mascaraMoeda(value) {
      value = value.toString();
      const onlyDigits = value
        .split("")
        .filter(s => /\d/.test(s))
        .join("")
        .padStart(3, "0");
      const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
      return maskCurrency(digitsFloat);
    }

    const entradas = mostrar.reduce((acc, cur) => {
      if (cur.type === 'credit') {
        acc += Number(cur.value)
      }
      return acc
    }, 0);

    const saidas = mostrar.reduce((acc, cur) => {
      if (cur.type === 'debit') {
        acc += Number(cur.value)
      }
      return acc
    }, 0);

    const newResume = {
      entradas: mascaraMoeda(entradas),
      saidas: mascaraMoeda(saidas),
      balance: saidas > entradas ? "-" + mascaraMoeda(entradas - saidas) : mascaraMoeda(entradas - saidas)
    }

    setResumeValues(newResume)
  }, [mostrar])

  function abrirfiltros() {
    const novoFiltro = { ...filtroSetings };
    novoFiltro.aberto = !novoFiltro.aberto;
    setFiltroSetings(novoFiltro)
  }

  return (
    <div className="App">
      <Header />
      <section className="principal">
        <main>
          <button className="open-filters-button" onClick={abrirfiltros}>
            <img src={filtro} alt="filtro" />
            <span>Filtrar</span>
          </button>
          <Filter diasFiltro={diasFiltro} categorias={categorias} filtroSetings={filtroSetings} setFiltroSetings={setFiltroSetings}/>
          <section className="table">
            <TableHead registros={registros} setRegistros={setRegistros} />
            <div className="table-body">
              {
                mostrar.map(item => <Registro className="table-line" item={item} setModal={setModalValues}
                requireLines={requireTransactions} key={item.id}
                mascaraMoeda={mascaraMoeda} />)
              }
            </div>
          </section>
        </main>
        <Resume entrada={resumeValues.entradas} saida={resumeValues.saidas} balance={resumeValues.balance} setModalValues={setModalValues} />
      </section>
      <Modal modal={modalValues} setModal={setModalValues} requireLines={requireTransactions} />
    </div>
  );
}

export default App;
