const alturaEmCm = 185;

const resultado = alturaEmCm >= 180 ? true : false;
if(resultado){
    if(alturaEmCm <= 185){
        console.log("LÍBERO")
    }else if(alturaEmCm <= 195){
        console.log("PONTEIRO")
    }else if(alturaEmCm <= 205){
        console.log("OPOSTO")
    }else{
        console.log("CENTRAL")
    }
}console.log("REPROVADO");

