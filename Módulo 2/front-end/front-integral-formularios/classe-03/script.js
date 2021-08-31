const genero = document.querySelector('select');
const formulario = document.querySelector('form');
const input = document.querySelector('.input-query');


const generos = {
    sertanejo: ['Baton de Cereja', 'Facas', 'Ficha Limpa', 'Foi Pa Pum', 'Sigilo', 'Troca de Calçada', 'Paradigmas', 'Despedida de Casal', 'Alô Ambev', 'Último Beijo'],
    rock: ['We Will Rock You — Queen', 'It’s Only Rock ‘N’ Roll (But I Like It) — Rolling Stones', 'My Generation — The Who', 'Stairway To Heaven — Led Zeppelin', 'Enter Sandman — Metallica', 'Another Brick In The Wall — Pink Floyd', 'Back In Black — AC/DC', 'Born To Be Wild — Steppenwolf', 'Hey Jude — The Beatles', 'Smoke On The Water — Deep Purple', 'Kashmir – Led Zeppelin', 'All Along The Watchtower – The Jimi Hendrix Experience', 'Comfortably Numb – Pink Floyd', 'Paranoid – Black Sabbath', 'Tom Sawyer – Rush', 'Piece Of My Heart – Janis Joplin', 'Sweet Emotion – Aerosmith', 'Light My Fire – The Doors', 'Hurricane – Bob Dylan', 'I Love Rock N’ Roll – Joan Jett', 'Don’t Stop Believin – Journey', 'Johnny B. Goode – Chuck Berry', 'Hound Dog – Elvis Presley', 'You Really Got Me – The Kinks', 'Rock And Roll All Night – Kiss', 'Heroes – David Bowie', 'Sultans Of Swing – Dire Straits', 'Because The Night – Patti Smith', 'Sunday Bloody Sunday – U2', 'Message In a Bottle – The Police', 'Living On a Prayer – Bon Jovi', 'Alive – Pearl Jam', 'Smells Like Teen Spirit – Nirvana'],
    eletronica: ['Alok. Alive (It Feels Like)', 'Joel Corry x MMEK. Head and Heart', 'Medusa ft. Dermot Kennedy. Paradise', 'Tiësto. The Business', 'SAINt JHN. Roses', 'Meduza ft. GoodBoys. Piece Of Your Heart', 'Meduza, Becky Hill, Goodboys. Lose Control', 'David Guetta & MORTEN feat Lanie Gardner. Dreams', 'Dubgodz, Cat Dealers – Good Good ', 'MAZ – Smile & Fly']
}


formulario.addEventListener('submit', (event) => {
    if(genero.value === "Selecionar"){
        event.preventDefault()
        return
    }
    if(genero.value === "Selecionar"){
        genero.classList.add('preencher')
    }else{
        genero.classList.remove('preencher')
    }
    const indice = Math.floor(Math.random() * (generos[genero.value].length - 1));
    input.value = generos[genero.value][indice];
})