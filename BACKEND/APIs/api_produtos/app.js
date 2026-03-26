import express from 'express';
import rotasUsuarios from "./src/routes/rotasUsuarios.js";
import rotasProdutos from "./src/routes/rotasProdutos.js";


//Importando o Banco de Dados
import { BD, testarConexao } from "./db.js";

//Importando Swagger
import swaggerUI from "swagger-ui-express";
import documentacao from "./config/swagger.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(documentacao))

app.get('/', async (req, res) => {
    await testarConexao();
    // res.status(200).json('API FUNCIONANDO ✅');
    res.redirect('/swagger')
});

//Utilizando Rotas
app.use(rotasUsuarios);
app.use(rotasProdutos);
app.use(cors());

const porta = 3000;
app.listen(porta, () => {
    console.log(`-> http://localhost:${porta} <-`);
});
