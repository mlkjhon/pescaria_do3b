import {Pool} from 'pg';

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bd_ordem_servicos',
    port: 5432,
    password: 'admin'
});

// const BD = new Pool({
//     user: 'postgres',
//     host: 'db.fzvjbprzzuwpeebphjyr.supabase.co',
//     database: 'postgres',
//     port: 5432,
//     password: 'bancodedadossenai'
// });

const testarConexao = async () => {
    try{
        const cliente = await BD.connect();
        console.log(' ✅ CONEXÃO REALIZADA COM SUCESSO ✅ ');
        cliente.release();
    }
    catch(error){
        console.error(' ❌ ERRO AO CONECTAR AO BANCO DE DADOS ❌ ', error.message);
        
    }
};

export {BD, testarConexao}