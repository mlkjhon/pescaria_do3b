import Jogador from "../Models/Jogador.js"

//Vetor de objetos de livros
let listaJogadores = [
    new Jogador(1, 'Gustavo Henrique', 10001 ),
    new Jogador(2, 'Anne Frank', 5000 ),
    new Jogador(3, 'Anônimo', 5001 )

]

const jogadorController = {
    listar: (req, res) => {
        res.render('jogadores.ejs', {jogadores: listaJogadores})
    },
    adicionar: (req, res) => {
        const {nome, pontuacao} = req.body;

        try{
            const novoJogador = new Jogador(
                listaJogadores.length + 1,
                nome,
                Number(pontuacao)
            );
            listaJogadores.push(novoJogador);
            res.redirect('/jogadores');
        }
        catch(e) {
            res.status(400).render('jogadores.ejs', {lista: listaJogadores, erro: e.message})
        }
    },
    adicionarPontos: (req, res) => {
        const {id} = req.body;
        const jogador = listaJogadores.find(j => j.id === Number(id));
        jogador.adicionarPontos();
        res.redirect('/jogadores');
    }
}

export default jogadorController;
