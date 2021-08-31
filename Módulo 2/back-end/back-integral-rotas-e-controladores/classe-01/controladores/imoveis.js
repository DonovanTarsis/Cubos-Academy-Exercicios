const imoveis = require("../dados/imoveis");


function get (req, res) {
    res.json(imoveis)
}

function getPorId (req, res) {
    const imovel = imoveis.find(x => x.id === Number(req.params.id));
    if (!imovel){
        res.status(404);
        res.json({
            erro: "Imóvel não encontrado"
        });
        return
    }
    res.json(imovel)
}

module.exports = {
    get,
    getPorId
}