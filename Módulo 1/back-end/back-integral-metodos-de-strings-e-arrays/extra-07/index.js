function formatarNumeroCel(numero){
    let numeroStr = `${numero}`;
    numeroStr = numeroStr.split("")
    if(numeroStr.length === 8){
        numeroStr.splice(0, 0, "9")
    }else if(numeroStr.length === 10){
        numeroStr.splice(2, 0, "9")
    }
    if (numeroStr.length === 11){
        for (let i = 0; i < 4; i += 3){
            if (i === 0){
                numeroStr.splice(i, 0, "(")
            }else{
                numeroStr.splice(i, 0, ") ")
            }
        }numeroStr.splice(5, 0, " ")
        numeroStr.splice(10, 0, "-")
    }else if(numeroStr.length === 9){
        for (let i = 1; i < 7; i += 5){
            if (i === 1){
                numeroStr.splice(i, 0, " ")
            }else{
                numeroStr.splice(i, 0, "-")
            }
        }
    }console.log(numeroStr.join(""))
}

const celular = 11912345678;
formatarNumeroCel(celular);