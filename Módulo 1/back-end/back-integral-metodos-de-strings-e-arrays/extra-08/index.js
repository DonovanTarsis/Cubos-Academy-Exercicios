function validEmail(text){
    if(text.includes("@") && text.includes(".") && text[0] !== "." && text[text.length -1] !== "."){
        console.log("E-mail válido")
    }else{
        console.log("E-mail inválido")
    }
}

let email = "jose@cubos.academy";
validEmail(email);
email = "jose@cubos.academy.br";
validEmail(email);
email = "jose.messias@cubos.academy	";
validEmail(email);
email = "jose.messias@cubos.io";
validEmail(email);
email = "jose@cubos";
validEmail(email);
email = "jose.messias@cubos";
validEmail(email);
email = "jose.messias@.";
validEmail(email);
email = "jose.@cubos";
validEmail(email);
email = ".@";
validEmail(email);
email = "@.";
validEmail(email);
email = "jose.messias@cubos.";
validEmail(email);
email = ".messias@cubos.";
validEmail(email);
email = ".messias@cubos";
validEmail(email);
email = "aluno@cubos.academy";
validEmail(email);
