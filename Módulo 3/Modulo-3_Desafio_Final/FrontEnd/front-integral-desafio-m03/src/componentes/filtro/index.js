import './style.css';
import addTag from '../.././assets/add-tag.svg';
import removeTag from '../.././assets/remove-tag.svg';

function FilterTag({ func, nome, ativo, filtroSetings, setFiltroSetings }) {

    function selectTag() {
        const tipo = ativo;
        let newFiltro = { ...filtroSetings }
        let { dias, tags } = newFiltro;

        if (tipo === 'dia') {
            if (dias.filter(item => item === nome).length > 0) {
                newFiltro.dias = dias.filter(item => item !== nome);
            } else {
                dias.push(nome);
            }
        } else if (tipo === 'tag') {
            if (tags.filter(item => item === nome).length > 0) {
                newFiltro.tags = tags.filter(item => item !== nome);
            } else {
                tags.push(nome);
            }
        }
        setFiltroSetings(newFiltro)

    }
    return (
        <button onClick={selectTag} className={`container-chip ${func(nome)}`}>
            <h3 className="tag-filter">{nome}</h3>
            <img src={func(nome) === 'selected' ? removeTag : addTag} alt="tag" className="icon-filter" />
        </button>
    )
}

function Filter({ diasFiltro, categorias, filtroSetings, setFiltroSetings }) {

    function handleClassDia(nome) {
        if (filtroSetings.dias.includes(nome)) {
            return "selected"
        } else {
            return
        }
    }

    function handleClassTag(nome) {
        if (filtroSetings.tags.includes(nome)) {
            return "selected"
        } else {
            return
        }
    }

    function limparFiltro(event) {
        event.preventDefault()
        setFiltroSetings({
            aberto: true,
            dias: [],
            tags: [],
            min: '',
            max: '',
            aply: false
        })
    }

    function aplicarFiltro(event) {
        event.preventDefault()
        const filtroAply = { ...filtroSetings, aply: true }
        setFiltroSetings(filtroAply)
    }

    function setMinValue(event) {
        const filtroAply = { ...filtroSetings, min: event.target.value }
        setFiltroSetings(filtroAply)
    }

    function setMaxValue(event) {
        const filtroAply = { ...filtroSetings, max: event.target.value }
        setFiltroSetings(filtroAply)
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
        <section className={`container-filters ${!filtroSetings.aberto && "hidden"}`}>
            <div className="dias filter-column">
                <h3 className="filter-title">Dia da semana</h3>
                <div className="container-tags">
                    {
                        diasFiltro.map(item => <FilterTag func={handleClassDia} nome={item.nome} ativo={item.tipo} filtroSetings={filtroSetings} setFiltroSetings={setFiltroSetings} key={item.nome} />)
                    }
                </div>
            </div>
            <div className="categorias filter-column">
                <h3 className="filter-title">Categoria</h3>
                <div className="container-tags">
                    {
                        categorias.map(item => <FilterTag func={handleClassTag} nome={item.nome} ativo={item.tipo} filtroSetings={filtroSetings} setFiltroSetings={setFiltroSetings} key={item.nome} />)
                    }
                </div>
            </div>
            <div className="valor filter-column-form">
                <h3 className="filter-title">Valor</h3>

                <form className="filter-form">
                    <div className="container-input">
                        <div className="container-filter-input" >
                            <label className="filter-input-label" htmlFor="min-value">Min</label>
                            <input className="filter-input" id="min-value" type="text" name="min-value" value={filtroSetings.min} onChange={setMinValue} onInput={mascaraMoeda} />
                        </div>
                        <div className="container-filter-input" >
                            <label className="filter-input-label" htmlFor="max-value">Max</label>
                            <input className="filter-input" id="max-value" type="text" name="max-value" value={filtroSetings.max} onChange={setMaxValue} onInput={mascaraMoeda} />
                        </div>
                    </div>
                    <div className="action-filter">
                        <button className="btn-clear-filters" type="submit" onClick={limparFiltro}>Limpar Filtros</button>
                        <button className="btn-apply-filters" type="submit" onClick={aplicarFiltro}>Aplicar Filtros</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Filter;