const {format} = require('date-fns');

function formatarUm (date){
    console.log(format(date, "dd 'de' MMMM 'de' yyyy"));
}
function formatarDois (date){
    console.log(format(date, "dd/MM/yyyy"));
}
function formatarTres (date){
    console.log(format(date, "dd MMM"));
}
function formatarQuatro (date){
    console.log(format(date, "dd MMM yyyy"));
}
function formatarCinco (date){
    console.log(format(date, "dd 'de' MMM 'de' yyyy"));
}
function formatarSeis (date){
    console.log(format(date, "dd/MMM"));
}
formatarUm(new Date(2020, 9, 5));
formatarDois(new Date(2020, 9, 5));
formatarTres(new Date(2020, 9, 5));
formatarQuatro(new Date(2020, 9, 5));
formatarCinco(new Date(2020, 9, 5));
formatarSeis(new Date(2020, 9, 5));
