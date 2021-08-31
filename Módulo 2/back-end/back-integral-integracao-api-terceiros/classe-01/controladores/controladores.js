const fs = require('fs/promises')
const { instanciaAxios } = require('../servicos/servicos');

const adicionando = async (lista, resposta, arquivo) =>{
    lista.push(resposta.data)
    fs.writeFile('./dados/empresas.json', JSON.stringify(arquivo, null, '\t'))
}





const empresas = async (req, res) => {
    const {dominioEmpresa} = req.params;
    console.log(dominioEmpresa)
    const arquivo = JSON.parse(await fs.readFile('./dados/empresas.json'));
    const listaEmpresas = arquivo.empresas
    for (let item of listaEmpresas){
        if (item.domain === dominioEmpresa){
            res.json(item);
            return
        }
    }
    const retorno = await instanciaAxios.get(``, {
        params:{
            domain:`${dominioEmpresa}`
        }
    });
    adicionando(listaEmpresas, retorno, arquivo)
    res.json(retorno.data)

}
58
module.exports = {empresas}