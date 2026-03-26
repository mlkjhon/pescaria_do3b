class Heroi{
    constructor(nome, poder, nivelPoder){
        this.nome = nome;
        this.poder = poder;
        this.nivelPoder = nivelPoder;
    }
    apresentar(){
        return`${this.nome}, ${this.poder}, ${this.nivelPoder}`
    }
}

class HeroiVingador extends Heroi{
    armaTec;
    constructor(nome, armaTec){
        super(nome);
        this.armaTec = armaTec;
    }

}
class HeroiXmen extends Heroi{
    mutacao;
    constructor(nome, mutacao){
        super(nome);
        this.mutacao = mutacao;
    }
}

//Polimorfismo
const heroi1 = new Heroi('Iron Man', 'Ser rico', 'Forte' )
console.log(heroi1.apresentar());

const heroi2 = new Heroi('Mercurio', 'Velocidade', 'Forte');
console.log(heroi2.apresentar());







