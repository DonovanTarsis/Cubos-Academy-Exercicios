function processData(input) {
    const senha = input.split("\n")[0];
    const inputA = input.split("\n")[1];
    const senhaArray = senha.trim().split("");
    const inputArray = inputA.trim().split("");
    let inputFiltrado = [];

    let ultimoIndice = 0;
    

    for(let item of senhaArray){
        for (let i = ultimoIndice; i < inputArray.length; i++){
            if(inputArray[i] === item){
                inputFiltrado.push(inputArray[i]);
                ultimoIndice = i +1;
                break;
            }
        }
    }if(inputFiltrado.join("") === senha){
        console.log('SIM')
    }else{
        console.log('NAO')
    }
}


const input = "cubos\ncuggbyos"
processData(input)