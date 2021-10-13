import './style.css';
import { useState } from 'react';
import edit from '../.././assets/edit.svg';
import lixo from '../.././assets/lixo.svg';

function Registro({ item, setModal, requireLines, mascaraMoeda }) {
  const [modalDelete, setModalDelete] = useState(false);
  let { date: data, week_day, description, category, value, type, id } = item;

  const date = data.slice(8, 10) + '/' + data.slice(5, 7) + '/' + data.slice(2, 4);
  data = data.slice(8, 10) + '/' + data.slice(5, 7) + '/' + data.slice(0, 4);
  if (!description) {
    description = "-";
  }

  value = mascaraMoeda(value);

  function openModalEdit() {
    const modalValues = {
      id: id,
      aberto: true,
      title: "Editar",
      tipo: type,
      valor: value,
      categoria: category,
      data: data,
      descricao: description
    };
    setModal(modalValues)
  }

  function deleteLine() {
    setModalDelete(!modalDelete);
    try {
      fetch(`http://localhost:3333/transactions/${item.id}`, {
        method: 'DELETE'
      });
      requireLines()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="table-line">
      <h2 className="data-line">{date}</h2>
      <h2 className="day-line">{week_day}</h2>
      <h2 className="descricao-line">{description}</h2>
      <h2 className="category-line">{category}</h2>
      <h2 id="value" className={`valor-line ${type === "credit" ? "line-in" : "line-out"}`}>{value}</h2>
      <div className="table-line-buttons">
        <img onClick={openModalEdit} src={edit} alt="editar" />
        <img onClick={() => setModalDelete(!modalDelete)} src={lixo} alt="deletar" />
        <div className={`modal-delete ${modalDelete ? '' : 'hidden'}`}>
          <h4 className="modal-delete-title">Apagar item?</h4>
          <div className="modal-delete-buttons">
            <button className="modal-delete-btn" onClick={deleteLine}>Sim</button>
            <button className="modal-delete-close" onClick={() => setModalDelete(!modalDelete)}>Não</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro;