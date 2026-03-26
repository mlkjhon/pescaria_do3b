class Jogador {
    constructor(id, nome, pontuacao){
        // if(!nome){
        //     throw new Error('Nome do Jogador é OBRIGATÓRIO')
        // }
        this.id = id;
        this.nome = nome;
        this.pontuacao = Number(pontuacao)
    }

    resumo(){
        return `${this.nome} `
    }
    nivel(){
        if(this.pontuacao <= 5000) return 'Iniciante'
        if(this.pontuacao <= 10000 && this.pontuacao > 5000) return 'Intermediário'
        return 'Avançado'
    }
    adicionarPontos(){
        this.pontuacao += 50;
    }

}

export default Jogador;