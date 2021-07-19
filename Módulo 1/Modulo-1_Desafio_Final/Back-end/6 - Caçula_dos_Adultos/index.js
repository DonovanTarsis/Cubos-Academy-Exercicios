function solucao(lista) {
  if(lista.some(x => x >= 18)){
        const caculaMaiorDeIdade = lista.sort((a, b) => a < b ? -1 : 1).find(x => x >= 18)
        console.log(caculaMaiorDeIdade);
    }else{
        console.log("CRESCA E APARECA")
    }
}

  
const lista = [12,18,27]
solucao(lista)