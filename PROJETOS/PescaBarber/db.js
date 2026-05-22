import { Pool } from 'pg';

const BD = new Pool({
    user: 'postgres',
    database: 'bd_barbearia_pescador',
    port: 5432,
    password: 'postgres'
})

const testarConexao = async () =>{
    try{
        const cliente = await BD.connect();
        console.log('Conexão realizada com sucesso!');
        cliente.release();  //libera conexao
    }
    catch(error){
        console.error('Erro ao conectar ao banco de dados', error.message)
    }
}

export {BD, testarConexao};