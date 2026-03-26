//Criando nossa primeira classe

class pessoa{
    //Atributos
    Nome;
    Idade;
};

//Criando um novo objeto (instancia)
const pessoa1 = new pessoa();
console.log(pessoa1);

//Aplicando valores aos atributos
pessoa1.Nome = "Carlos";
pessoa1.Idade = 56;
console.log(pessoa1);

//Criando nova pessoa
const pessoa2 = new pessoa();

pessoa2.Nome = 'Gustavo Henrique';
pessoa2.Idade = 16;
console.log(pessoa2);
