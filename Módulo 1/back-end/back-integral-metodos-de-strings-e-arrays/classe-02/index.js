function validarCpf (cpf){
    let cpfFormatado =[];
    if (cpf.length === 11){
        cpfFormatado = cpf.split("");
        for( let i = 3; i < 8; i += 4){
           cpfFormatado.splice(i, 0, ".");
        }
        cpfFormatado.splice(-2, 0, "-");
        cpfFormatado = cpfFormatado.join("");
        console.log(cpfFormatado);
    }else{
        console.log("CPF Inválido")
    }
}
function validarCnpj (cnpj){
    let cnpjFormatado =[];
    if (cnpj.length === 14){
        cnpjFormatado = cnpj.split("");
        for( let i = 2; i < 12; i += 4){
           if (i < 8){
               cnpjFormatado.splice(i, 0, ".");
           }else{
            cnpjFormatado.splice(i, 0, "/");
           }
        }
        cnpjFormatado.splice(-2, 0, "-");
        cnpjFormatado = cnpjFormatado.join("");
        console.log(cnpjFormatado);
    }else{
        console.log("CNPJ Inválido")
    }
}
const cpf = "12345678900";
const cnpj = "12345678900000";
validarCpf(cpf);
validarCnpj(cnpj);
