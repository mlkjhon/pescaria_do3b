class bruxo{
    #nivelEnergia

        constructor(nome, idade, feitico, casa, nivel_magia, nivelEnergia){
            this.nome = nome;
            this.idade = idade;
            this.feitico = feitico;
            this.casa = casa;
            this.nivel_magia = nivel_magia;
            this.#nivelEnergia = nivelEnergia;
        
        }
        apresentar(){
            return `${this.nome}, ${this.idade}, ${this.feitico}, ${this.casa}, ${this.nivel_magia} `
        }
        mostrarEnergia(){
            return this.#nivelEnergia
        }
        recarregarEnergia(){
            return this.#nivelEnergia += 10
        }
        lancarFeitico(){
            return this.#nivelEnergia -= 10
        }
}

const bruxo1 = new bruxo('Ronaldinho Gaúcho', 46, 'Drible', 'Brasil', 'Muito forte', 100);
console.log(bruxo1.apresentar());
console.log(bruxo1.mostrarEnergia());
console.log(bruxo1.recarregarEnergia());
console.log(bruxo1.lancarFeitico());
