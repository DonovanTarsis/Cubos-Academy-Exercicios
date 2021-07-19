function processData(input) {
    const stringTratada = input.split("\n");
    const n = parseInt(stringTratada[0]);
    let cordenadas = [];
    let maior = 0;
    let distancia = 0;
    for(let i = 1; i < stringTratada.length; i++){
        let cordenada = stringTratada[i].split(" ")
        cordenadas.push({
            x: cordenada[0],
            y: cordenada[1]
        })
    }for(let i = 0; i < cordenadas.length; i++){
        for(let item of cordenadas){
            distancia = Math.sqrt((item.x - cordenadas[i].x)**2 + (item.y - cordenadas[i].y)**2)
            if(distancia > maior){
                maior = distancia;
            }
        }
    }console.log(maior);
} 

const input = "3\n0 0\n0 3\n4 0";
processData(input)