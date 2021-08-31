const { parse } = require('date-fns');
const lista = [
    {
      "name": "Kirkland",
      "company": "ECLIPSENT",
      "registered": "Mon Dec 07 2015 07:01:50 GMT+0000"
    },
    {
      "name": "Elise",
      "company": "ILLUMITY",
      "registered": "Fri Mar 02 2018 11:37:56 GMT+0000"
    },
    {
      "name": "Waters",
      "company": "PERMADYNE",
      "registered": "Tue Apr 09 2019 08:31:31 GMT+0000"
    },
    {
      "name": "Tanner",
      "company": "MIRACLIS",
      "registered": "Wed Nov 14 2018 16:11:14 GMT+0000"
    },
    {
      "name": "Knapp",
      "company": "ENDIPIN",
      "registered": "Sun Jul 30 2017 00:05:33 GMT+0000"
    },
    {
      "name": "Beverly",
      "company": "MYOPIUM",
      "registered": "Thu Sep 07 2017 16:13:51 GMT+0000"
    },
    {
      "name": "Mcfarland",
      "company": "JASPER",
      "registered": "Mon Sep 14 2020 10:02:15 GMT+0000"
    },
    {
      "name": "Vaughan",
      "company": "ULTRIMAX",
      "registered": "Tue May 06 2014 00:08:34 GMT+0000"
    },
    {
      "name": "Parker",
      "company": "LUXURIA",
      "registered": "Tue Jun 16 2020 14:13:29 GMT+0000"
    }
]

lista.sort((a, b) =>{
    const dataUm = +(new Date(a.registered));
    const dataDois = +(new Date(b.registered));
    const retorno = dataUm - dataDois;
    return retorno
})
console.log(lista);


/* lista.sort((a, b) =>{
    const dataUm = +parse(a.registered.substr(4), "MMM dd yyyy HH:mm:ss 'GMT'xxxx", new Date());
    const dataDois = +parse(b.registered.substr(4), "MMM dd yyyy HH:mm:ss 'GMT'xxxx", new Date());
    const retorno = dataUm - dataDois
    return retorno
})
console.log(lista); */