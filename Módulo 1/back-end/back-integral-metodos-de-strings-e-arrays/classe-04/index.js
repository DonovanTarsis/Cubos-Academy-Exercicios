function sistemaDeFormulario (id, name, email, tags){
    let index;
    let nomeFormatado = name;
    let formulario = {};
    formulario.identificador = id.padStart(6, "0");
    nomeFormatado = nomeFormatado.split(" ")
    for(let i = 0; i < nomeFormatado.length; i++){
        nomeFormatado[i] = nomeFormatado[i].replace(nomeFormatado[i][0], nomeFormatado[i][0].toUpperCase(),);
    }
    nomeFormatado = nomeFormatado.join(" ")
    formulario.nome = nomeFormatado;
    formulario.email = email.trim();
    formulario.tags = tags.join(", ")
    console.log(formulario.identificador);
    console.log(formulario.nome);
    console.log(formulario.email);
    console.log(formulario.tags);
}


let identificador = "123";
let nome = "José silva costa";
let email = "      jose@email.com  ";
let tags = ['financeiro', 'administrativo', 'geral'];
sistemaDeFormulario(identificador, nome, email, tags);