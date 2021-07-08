const original = [1, 4, 12, 21, 53, 88, 112];

const pares = [];

for(let number of original){
    if(number % 2 === 0){
        pares.push(number);
    }
}console.log(pares);
