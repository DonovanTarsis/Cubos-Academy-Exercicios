function solucao(jogadores) {
  const jogaramZero = [];
    const jogaramUm = [];
    for(let item of jogadores){
        if(item.jogada === 0){
            jogaramZero.push(item.nome);
        }else{
            jogaramUm.push(item.nome);
        }
    }if(jogaramZero.length === 1){
        console.log(jogaramZero[0])
    }else if(jogaramUm.length === 1){
        console.log(jogaramUm[0])
    }else{
        console.log("NINGUEM")
    }
}

  
  const jogadores = [
    {
      "nome": "Herman",
      "jogada": 1
    },
    {
      "nome": "Rhodes",
      "jogada": 0
    },
    {
      "nome": "Beach",
      "jogada": 0
    },
    {
      "nome": "Laurel",
      "jogada": 0
    },
    {
      "nome": "Beatrice",
      "jogada": 0
    },
    {
      "nome": "Alison",
      "jogada": 0
    },
    {
      "nome": "Saundra",
      "jogada": 0
    },
    {
      "nome": "Klein",
      "jogada": 0
    }
  ]

  solucao(jogadores)