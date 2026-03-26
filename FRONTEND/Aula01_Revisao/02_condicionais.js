let idade = 18;

if (idade >= 18) {
    console.log("Você é um adulto");

} else if (idade >= 12 && idade < 18) {
    console.log("Você é um adolescente");

} else {
    console.log('Você é uma criança');
    
};

// Operador Ternário

let tema = 'Dark';
let CorFundo;

// if (tema == 'Dark'){
//     CorFundo = 'Preto';
// } else {
//     CorFundo = 'Branco';
// };

    tema == 'Dark' ? CorFundo = 'Preto' : CorFundo = 'Branco'; 
//    Condição          Se Verdadeira            Se Não            