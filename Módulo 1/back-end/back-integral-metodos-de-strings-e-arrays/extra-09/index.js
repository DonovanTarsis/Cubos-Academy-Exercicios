function separador(lista, tamanho){
    for(let i = 1; lista.length > 0; i++){
        if(lista.length >= tamanho){
            console.log(`Grupo${i}: ${lista.splice(0, tamanho).join(", ")}.`)
        }else{
            console.log(`Grupo${i}: ${lista.join(", ")}.`)
            break
        }
    }
}

const nomes = ['Juninho', 'Léo', 'Guido', 'Dina', 'Vitinho', 'Nanda'];
const tamanhoDoGrupo = 4;
separador(nomes, tamanhoDoGrupo);