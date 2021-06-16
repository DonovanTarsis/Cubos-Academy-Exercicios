const jogada1 = "pedra"
const jogada2 = "tesoura"

if (jogada1 === "pedra" && jogada2 === "tesoura" ||jogada1 === "tesoura" && jogada2 === "papel" ||jogada1 === "papel" && jogada2 === "pedra"){
    console.log(jogada1)
}else if(jogada2 === "pedra" && jogada1 === "tesoura" ||jogada2 === "tesoura" && jogada1 === "papel" ||jogada2 === "papel" && jogada1 === "pedra"){
    console.log(jogada2)
}else{
    console.timeLog("empate")
}