const fs = require('fs/promises');
const { instanciaAxios } = require('../servicos/servicos');

const adicionando = async (objeto) => {
    try{
        const arquivo = JSON.parse(await fs.readFile('./dados/votos.json'));
        console.log(arquivo)
        const votos = arquivo.votos
        votos.push(objeto)
        fs.writeFile('./dados/votos.json', JSON.stringify(arquivo, null, '\t'))
    }catch(error){
        const votos = arquivo.votos
        votos.push(objeto)
        fs.writeFile('./dados/votos.json', JSON.stringify(arquivo, null, '\t'))
    }
    
    
}






const votar = async (req, res) => {
    const { voto } = req.body;
    const { pais, ip } = req.params;

    try {
        const retorno = await instanciaAxios.get('', {
            params: {
                ip_address: `${ip}`
            }
        });
        console.log(retorno)
        const resposta = retorno.data;
        if (resposta.country === pais) {
            adicionando({
                ip,
                voto
            })
            res.json({
                mensagem: "Voto válido"
            })
        } else {
            res.status(400).json({
                erro: "IP enviado não coincide com o país da votação."
            })
        }
    } catch (error) {
        return res.status(400).json({
            erro: "IP inválido."
        })
    }
}



const imprimirVotos = async (req, res) => {
    const arquivo = JSON.parse(await fs.readFile('./dados/votos.json'));
    res.json(arquivo.votos)
}

module.exports = { votar, imprimirVotos }



/*   
data: {
    ip_address: '177.74.84.133',
    city: 'Dracena',
    city_geoname_id: 3464426,
    region: 'Sao Paulo',
    region_iso_code: 'SP',
    region_geoname_id: 3448433,
    postal_code: '17900',
    country: 'Brazil',
    country_code: 'BR',
    country_geoname_id: 3469034,
    country_is_eu: false,
    continent: 'South America',
    continent_code: 'SA',
    continent_geoname_id: 6255150,
    longitude: -51.6004,
    latitude: -21.5797,
    security: { is_vpn: false },
    timezone: {
      name: 'America/Sao_Paulo',
      abbreviation: '-03',
      gmt_offset: -3,
      current_time: '23:47:38',
      is_dst: false
    } */