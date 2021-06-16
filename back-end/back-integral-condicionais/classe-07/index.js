const aposentada = false;
const portadoraDeDoenca = false;
const totalDeRendimentos = 3000000; //emCentavos

if(!aposentada && !portadoraDeDoenca){
    if(totalDeRendimentos / 100 <= 28559.70){
        console.log("VAZA LEAO! JA TA DIFICIL SEM VOCE")
    }else{
        console.log("PEGA LEAO")
    }
}else{
    console.log("ISENTA")
}