const idade = 18;
const possuiPatologia = false;
const altura = 180;
const ehEstudante = false;

if(idade >= 12 && idade <=65){
    if(!possuiPatologia){
        if(altura >= 150){
            if(idade === 18 || ehEstudante){
                console.log("10 reais")
            }else{
                console.log("20 reais")
            }
        }else{
            console.log("ACESSO NEGADO")
        }
    }else{
        console.log("ACESSO NEGADO")
    }
}else{
    console.log("ACESSO NEGADO")
}