class Pessoa{
    //Atributo privado
    #documento;

    //AtributoPúblico
    nome;
    idade;

    constructor(nome, idade, documento){
        this.nome = nome;
        this.idade = idade;
        this.#documento = documento;
    }
    apresentar(){
        return `${this.nome}, ${this.idade}`
    }
    mostrarDocumento(){
        return this.#documento
    }
}

const pessoa1 = new Pessoa('Gustavo Henrique', 16, '50428512836');
console.log(pessoa1.apresentar());
console.log(pessoa1.mostrarDocumento());
