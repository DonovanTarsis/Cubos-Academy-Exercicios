function solucao(carta) {
    const tabela = [
        {"vira": "Q",
        "manilha": "J"},
        {"vira": "J",
        "manilha": "K"},
        {"vira": "K",
        "manilha": "A"},
        {"vira": "A",
        "manilha": "2"},
        {"vira": "2",
        "manilha": "3"},
        {"vira": "3",
        "manilha": "Q"}
    ];
    const manilha = tabela.find(x => x.vira === carta.toUpperCase()).manilha;
    console.log(manilha)
}


const carta = "Q"
solucao(carta);