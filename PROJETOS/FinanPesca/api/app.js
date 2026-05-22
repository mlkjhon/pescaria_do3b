import express from 'express';
import rotasUsuarios from "./src/routes/rotasUsuarios.js";
import rotasCategorias from "./src/routes/rotasCategorias.js";
import rotasSubCategorias from "./src/routes/rotasSubCategorias.js";
import rotasTransacoes from "./src/routes/rotasTransacoes.js";
import rotasDashboard from "./src/routes/rotasDashboard.js";

//Importando o Banco de Dados
import { BD, testarConexao } from "./db.js";

//Importando Swagger
import swaggerUI from "swagger-ui-express";
import swagger from './config/swagger.js'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swagger))

app.get('/', async (req, res) => {
    await testarConexao();
    // res.status(200).json('API FUNCIONANDO ✅');
    res.redirect('/swagger')
});

app.use(cors());

//Utilizando Rotas
app.use(rotasUsuarios);
app.use(rotasCategorias);
app.use(rotasSubCategorias);
app.use(rotasTransacoes);
app.use(rotasDashboard);


// Adicione:
app.get('/swagger', (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head>
  <title>API Ordens de Serviço</title>
  <meta charset="utf-8"/>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css"&gt;
</head><body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script&gt;
  <script>
    SwaggerUIBundle({
      spec: ${JSON.stringify(documentacao)},
      dom_id: '#swagger-ui'})
  </script>
</body></html>`);
});

const porta = 3000;
app.listen(porta, () => {
    console.log(`-> http://localhost:${porta} <-`);
});
