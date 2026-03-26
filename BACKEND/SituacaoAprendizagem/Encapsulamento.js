class Heroi {

    #vida;
    #armaTec;

    constructor(nome, poder, nivelPoder, vida, armaTec){
        this.nome = nome;
        this.poder = poder;
        this.nivelPoder = nivelPoder;
        this.#vida = vida;
        this.#armaTec = armaTec;
    }

    apresentar(){
        return `${this.nome}, ${this.poder}, ${this.nivelPoder}, ${this.#armaTec}`
    }
    mostrarVida(){
        return this.#vida
    }
    mostrarArma(){
        return this.#vida += 10
    }
}

const heroi = new Heroi('Homem de Ferro', 'Ser Rico', 'Forte', 100, 'Amadura');
console.log(heroi.apresentar());
console.log(heroi.mostrarVida());
console.log(heroi.mostrarArma());



