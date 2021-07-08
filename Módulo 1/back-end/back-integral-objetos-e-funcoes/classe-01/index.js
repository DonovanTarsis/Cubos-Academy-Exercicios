function corrigirProva(prova){
    let corretas = 0;
    for (let item of prova.questoes){
        if(item.resposta === item.correta){
            corretas++;
        }
    }
    const nota = (prova.valor / prova.questoes.length) * corretas;
    console.log(`O aluno(a) ${prova.aluno} acertou ${corretas} questões e obteve nota ${nota}`);
};


const prova = {
    aluno: "João",
    materia: "Português",
    valor: 10,
    questoes: [
        {
            resposta: "a",
            correta: "b"
        },
        {
            resposta: "c",
            correta: "c"
        },
        {
            resposta: "e",
            correta: "b"
        },
        {
            resposta: "b",
            correta: "b"
        },
        {
            resposta: "c",
            correta: "c"
        }
    ]
};
corrigirProva(prova);
