import express from "express";

const app = express();

app.use('/dogs', express.static('public'));

//Criaçaõ do primeiro endpoint 
app.get('/',async (req, res) => {
    res.status(200).json("API Funcionando 👍")
});

//Criando novo end point para consumir dados da API VIACEP
app.get('/cep/:codigo', async(req, res) => {
    const codigo = req.params.codigo;

    //metdo fetch é o mensageiro que vai até a outra api e traz a resposta 
    const resposta = await fetch(`https://viacep.com.br/ws/${codigo}/json`);
    const dados = await resposta.json(); 

    const cidade = dados.localidade;
    const estado = dados.uf;

    // res.json(dados)
    res.status(201).json({cidade, estado})
});

//API STARWARS
app.get('/starwars/:id', async(req, res) => {
    const id = req.params.id;

    //metdo fetch é o mensageiro que vai até a outra api e traz a resposta 
    const resposta = await fetch(`https://swapi.dev/api/people/${id}/`);
    const dados = await resposta.json(); 

    const resultado = {
        nome: dados.name,
        altura: dados.height,
        peso: dados.mass,
        cor_dos_olhos: dados.eye_color
    }

    // res.json(dados)
    res.json({resultado})
});

app.get('/dog/:id', async(req, res) => {
    const id = req.params.id;
    const url = `https://http.dog/${id}.jpg`;

    res.json({url});
});

const porta = 3000;
app.listen( porta, () => {
    console.log(`Servidor Rodando http://localhost:${porta}`);
});