import './style.css';

function Resume({ entrada, saida, balance, setModalValues }) {
    function abrirModal() {
        const novoModal = {
            id: "",
            aberto: true,
            title: "Adicionar",
            tipo: "debit",
            valor: "",
            categoria: "",
            data: "",
            descricao: ""
        };
        setModalValues(novoModal)
    }

    return (
        <div>
            <div className="container-resume">
                <h1 className="title-resume">Resumo</h1>
                <div className="div-resume resume-in">
                    <h3>Entradas</h3>
                    <span className="in">{entrada}</span>
                </div>
                <div className="div-resume resume-out">
                    <h3>Saídas</h3>
                    <span className="out">{saida}</span>
                </div>

                <div className="div-resume resume-balance">
                    <h3>Saldo</h3>
                    <span className="balance">{balance}</span>
                </div>
            </div>
            <button className="btn-add" onClick={abrirModal}>Adicionar Registro</button>
        </div>
    )
}

export default Resume;