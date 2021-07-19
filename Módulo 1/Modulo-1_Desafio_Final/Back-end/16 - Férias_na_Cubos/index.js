function processData(input) {
    const grupos = input.split(" ");
    let grupos1 = parseInt(grupos[0]);
    let grupos2 = parseInt(grupos[1]);
    let grupos3 = parseInt(grupos[2]);
    let grupos4 = parseInt(grupos[3]);
    
    if(grupos1 > grupos3){
        grupos1 -= grupos3
        grupos4 += grupos3;
        grupos3 = 0;
    }else if(grupos1 <= grupos3){
        grupos3 -= grupos1;
        grupos4 += grupos1;
        grupos1 = 0;
    }if(grupos1 % 2 === 0){
        grupos2 += grupos1 / 2
        grupos1 = 0
    }else if(grupos1 % 2 === 1){
        grupos2 += (grupos1 - 1)/2;
        grupos1 = 1
    }
    if(grupos2 % 2 === 0){
        grupos4 += grupos2/2
        grupos2 = 0
    }else if(grupos2 % 2 === 1){
        grupos4 += (grupos2 - 1)/2
        grupos2 = 1;
    }if(grupos2 === 1 && grupos1 === 1){
        grupos3 = 1;
        grupos2 = 0;
        grupos1 = 0;
    }
    console.log(grupos1 + grupos2 + grupos3 + grupos4);
} 

const input = ("4 0 2 3")

processData(input)