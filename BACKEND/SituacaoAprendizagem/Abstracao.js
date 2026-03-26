class Heroi {
    constructor(nome, poder, nivelPoder, vida){
        this.nome = nome;
        this.poder = poder;
        this.nivelPoder = nivelPoder;
        this.vida = vida;
    }
}

const heroi = new Heroi('Homem de Ferro', 'Ser Rico', 'Forte', 100);
console.log(heroi);
