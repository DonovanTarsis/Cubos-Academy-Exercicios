function processData(input) {
    const palavra = input.trim();
    const palavraMaiuscula = palavra.toUpperCase();
    const palavraMinuscula = palavra.toLowerCase();
    if (palavraMaiuscula === palavra){
        console.log(palavraMinuscula);
    }else if(palavra[0] === palavraMinuscula[0] && palavra.slice(1, palavra.length) === palavraMaiuscula.slice(1, palavraMaiuscula.length)) {
        console.log(palavraMaiuscula[0] + palavraMinuscula.slice(1, palavraMinuscula.length));
    }else{
        console.log(palavra)
    }
}


const input = "cAPS";
processData(input)