const notas = [6, 20, 33, 454, 8, 9, 9, 6, 8, 9, 20, 20, 33];
const notasSemRepetir = []
notas.forEach(y => {
        if(!notasSemRepetir.find(x => x === y)){
            notasSemRepetir.push(y)
        }
    })
console.log(notasSemRepetir)