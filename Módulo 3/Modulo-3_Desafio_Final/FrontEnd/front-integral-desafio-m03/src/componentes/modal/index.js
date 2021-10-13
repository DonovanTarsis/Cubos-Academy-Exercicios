import './style.css';

import { parse } from 'date-fns/esm';
import InputMask from 'react-input-mask';
import closeModal from '../.././assets/close-modal.svg';

function Modal({ modal, setModal, requireLines }) {
    function fecharModal() {
        const novoModal = { ...modal, aberto: false };
        setModal(novoModal)
    }

    function setTipoRegistro(event) {
        if (event.target.name === "debit" || event.target.name === "credit") {
            event.preventDefault()
            const novoModal = { ...modal, tipo: event.target.name };
            setModal(novoModal)
        }
        if (event.target.name === "value") {
            event.preventDefault()
            const novoModal = { ...modal, valor: event.target.value };
            setModal(novoModal)
        }
        if (event.target.name === "category") {
            event.preventDefault()
            const novoModal = { ...modal, categoria: event.target.value };
            setModal(novoModal)
        }
        if (event.target.name === "date") {
            event.preventDefault()
            const novoModal = { ...modal, data: event.target.value };
            setModal(novoModal)
        }
        if (event.target.name === "description") {
            event.preventDefault()
            const novoModal = { ...modal, descricao: event.target.value };
            setModal(novoModal)
        }
    }
    async function sendForm(event) {
        event.preventDefault()
        const { id, title, tipo, valor, categoria, data, descricao } = modal;
        if (!title || !tipo || !valor || !categoria || !data || !descricao || valor === "R$ 0,00"){
            return
        }

        if (valor === "R$ 0,00"){
            const newmodal = {...modal, valor: 0}
            setModal(newmodal)
            return
        }

        const date = parse(data, 'dd/MM/yyyy', new Date());
        const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
        const week_day = diasSemana[date.getDay()];
        const description = descricao;
        let value = valor.replace('R$', '').replace(',', '');
        while (value.includes(".")) {
            value = value.replace('.', '')
        }
        value = Number(value)
        const category = categoria;
        const type = tipo;
        const body = {
            date,
            week_day,
            description,
            value,
            category,
            type
        }
        event.preventDefault()
        if (title === "Adicionar") {
            try {
                await fetch('http://localhost:3333/transactions', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
            } catch (error) {
                console.log(error.message)
            }

        } else if (title === "Editar") {
            try {
                await fetch(`http://localhost:3333/transactions/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        fecharModal()
        requireLines()
    }

    function mascaraMoeda(event) {
        const onlyDigits = event.target.value
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        event.target.value = maskCurrency(digitsFloat)
    }

    function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }

    return (
        <div className={`modal ${modal.aberto ? "" : "hidden"}`}>
            <div className="modal-container">
                <h1 className="modal-title">
                    {modal.title + " Registro"}
                </h1>
                <img src={closeModal} alt="" className="close-icon" onClick={fecharModal} />
                <form className="modal-form">
                    <div className="container-btn">
                        <button className={`credit-button ${modal.tipo !== "credit" && "inactive-btn"}`} name="credit" onClick={setTipoRegistro}>Entrada</button>
                        <button className={`debit-button ${modal.tipo !== "debit" && "inactive-btn"}`} name="debit" onClick={setTipoRegistro}>Saída</button>
                    </div>
                    <div className="modal-div">
                        <label htmlFor="valor" className="modal-label">Valor</label>
                        <input required="required" id="valor" type="text" name="value" className="modal-div-input" value={modal.valor} onChange={setTipoRegistro} onInput={mascaraMoeda} />
                    </div>
                    <div className="modal-div">
                        <label htmlFor="category" className="modal-label">Categoria</label>
                        <input required="required" id="category" type="text" name="category" className="modal-div-input" value={modal.categoria} onChange={setTipoRegistro} />
                    </div>
                    <div className="modal-div">
                        <label htmlFor="data" className="modal-label">Data</label>

                        <InputMask required="required" id="data" mask="99/99/9999" name="date" maskChar="_" className="modal-div-input" value={modal.data} onChange={setTipoRegistro} />
                    </div>
                    <div className="modal-div">
                        <label htmlFor="description" className="modal-label">Descrição</label>
                        <input required="required" id="description" type="text" name="description" className="modal-div-input" value={modal.descricao} onChange={setTipoRegistro} />
                    </div>
                    <button type="submit" className="btn-insert" onClick={sendForm}>Confirmar</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;