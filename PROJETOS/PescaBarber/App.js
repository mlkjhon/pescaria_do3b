import express from 'express';
import {BD, testarConexao} from './db.js';
import swaggerUI from 'swagger-ui-express';
import swagger from './config/swagger.js'
import rotasUsuarios from './src/routes/rotasUsuarios.js';
import rotasServicos from './src/routes/rotasServicos.js';
import rotasAgendamentos from './src/routes/rotasAgendamentos.js';
import rotasDashboard from './src/routes/rotasDashboard.js';
import cors from 'cors'

const app = express();


app.use(express.json());
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swagger))

app.get('/', async(req, res) =>{
    await testarConexao();
    res.redirect('/swagger')
})


app.use(rotasUsuarios);
app.use(rotasServicos);
app.use(rotasAgendamentos);
app.use(rotasDashboard);
app.use(cors());
const porta = 3000;
app.listen(porta, () =>{
    console.log(`http://localhost:${porta}`);
})