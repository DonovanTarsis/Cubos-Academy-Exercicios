function solucao(precos) {
  if(precos.length >= 3){
      const desconto = precos.sort((a, b) => a < b ? -1 : 1)[0] * 0.5;
      const valorFinal = precos.reduce((acc, cur) => acc += cur) - desconto;
      console.log(valorFinal);
  }else{
      const valorFinal = precos.reduce((acc, cur) => acc += cur);
      console.log(valorFinal);
  }
}

const precos = [100,100,100]
solucao(precos)