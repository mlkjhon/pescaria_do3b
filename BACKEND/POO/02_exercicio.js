//Construindo Bruxo
class bruxo {
    constructor(nome, idade, feitico, casa, nivel_magia){
        this.nome = nome;
        this.idade = idade;
        this.feitico = feitico;
        this.casa = casa;
        this.nivel_magia = nivel_magia;
    }
}

const bruxo1 = new bruxo('Ronaldinho Gaúcho', 46, 'Drible', 'Brasil', 'Muito forte')
console.log(bruxo1);