import Livro from "../models/livro.js";

//Vetor de objetos de livros
let listaLivros = [
    new Livro(1, 'Autobiografia de Gustavo Henrique', 'Gustavo Henrique', 1000 ),
    new Livro(2, 'Bíblia', 'Vários Autores', 3000 ),
    new Livro(3, 'Diário de Anne Frank', 'Anne Frank', 100 ),

]

const livroController = {
    listar: (req, res) => {
        res.render('livros.ejs', {livros: listaLivros})
    },
    adicionar: (req, res) => {
        const {titulo, autor, paginas} = req.body;

        try{
            const novoLivro = new Livro(
                listaLivros.length + 1,
                titulo,
                autor,
                Number(paginas)
            );
            listaLivros.push(novoLivro);
            res.redirect('/livros');
        }
        catch(e) {
            res.status(400).render('livros.ejs', {lista: listaLivros, erro: e.message})
        }
    },
    marcarComoLido: (req, res) => {
        const {id} = req.body;
        const livro = listaLivros.find(l => l.id === Number(id));
        livro.marcarComoLido();
        res.redirect('/livros');
    }
}

export default livroController;
