import express, { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os usuários
router.get('/transacoes', async (req, res) => {
    try {



        const comando = `SELECT t.id_transacao, t.valor, t.descricao,
            TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
            TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
            TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
            t.tipo,
            c.nome AS nome_categoria,
            s.nome AS nome_subcategoria
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria`;

        //Cria uma variável para receber o retorno do SQL
        const transacoes = await BD.query(comando);

        //Retorno para a pagina, o json com os dados buscados do SQL
        res.status(200).json(transacoes.rows);
    }
    catch (error) {
        console.error(' ❌ ERRO AO LISTAR TRANSAÇÕES ❌ ', error.message);
        return res.status(500).json({ error: '❌ ERRO AO LISTAR TRANSAÇÕES ❌' + error.message });
    }
});
router.get('/transacoes/periodo', async (req, res) => {
    //requisição a partir de uma query
    const { inicio, fim } = req.query;
    try {

        if (!inicio || !fim) {
            return res.status(400).json({ message: 'Informe as datas de inicio e fim para listar as transações.' });
        }

        const comando = `SELECT t.id_transacao, t.valor, t.descricao,
            TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
            TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
            TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
            t.tipo,
            c.nome AS nome_categoria,
            s.nome AS nome_subcategoria
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
            WHERE t.data_registro BETWEEN TO_DATE($1, 'DD/MM/YYYY') AND TO_DATE ($2, 'DD/MM/YYYY')
            ORDER BY t.data_registro DESC`;

        //Cria uma variável para receber o retorno do SQL
        const transacoes = await BD.query(comando, [inicio, fim]);

        //Retorno para a pagina, o json com os dados buscados do SQL
        res.status(200).json(transacoes.rows);
    }
    catch (error) {
        console.error(' ❌ ERRO AO LISTAR TRANSAÇÕES ❌ ', error.message);
        return res.status(500).json({ error: '❌ ERRO AO LISTAR TRANSAÇÕES ❌' + error.message });
    }
});
router.get('/transacoes/tipo', async (req, res) => {
    const { tipo } = req.query;
    try {

        if (!tipo) {
            return res.status(400).json({ message: 'Informe o tipo de transação para listar as transações.' });
        }

        const comando = `SELECT t.id_transacao, t.valor, t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                c.nome AS nome_categoria,
                s.nome AS nome_subcategoria
                FROM transacoes t
                LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                WHERE t.tipo = $1
                ORDER BY t.data_registro DESC`;

        //Cria uma variável para receber o retorno do SQL
        const transacoes = await BD.query(comando, [tipo]);

        //Retorno para a pagina, o json com os dados buscados do SQL
        res.status(200).json(transacoes.rows);
    }
    catch (error) {
        console.error(' ❌ ERRO AO LISTAR TRANSAÇÕES ❌ ', error.message);
        return res.status(500).json({ error: '❌ ERRO AO LISTAR TRANSAÇÕES ❌' + error.message });
    }
});
router.get('/transacoes/total', async (req, res) => {
    const { tipo } = req.query;

    try {
        if (!tipo) {
            return res.status(400).json({ message: 'Informe o tipo de transação (E ou S) para calcular o total.' });
        }

        const comando = `SELECT SUM(valor) AS total FROM transacoes WHERE tipo = $1`;
        const resultado = await BD.query(comando, [tipo.toUpperCase()]);

        return res.status(200).json({
            tipo: tipo.toUpperCase(),
            total: resultado.rows[0].total || 0
        });
    } catch (error) {
        return res.status(500).json({ error: '❌ ERRO AO CALCULAR TOTAL DE TRANSAÇÕES ❌' + error.message });
    }
});
router.get('/transacoes/:id_transacao', async (req, res) => {
    const { id_transacao } = req.params;
    try {

        if (!id_transacao) {
            return res.status(400).json({ message: 'Informe o ID da transação para obter seus detalhes.' });
        }

        const comando = `SELECT t.id_transacao, t.valor, t.descricao,
            TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
            TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
            TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
            t.tipo,
            c.nome AS nome_categoria,
            s.nome AS nome_subcategoria
            FROM transacoes t
            LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
            WHERE t.id_transacao = $1
            ORDER BY t.data_registro DESC`;

        //Cria uma variável para receber o retorno do SQL
        const transacoes = await BD.query(comando, [id_transacao]);

        //Retorno para a pagina, o json com os dados buscados do SQL
        res.status(200).json(transacoes.rows);
    }
    catch (error) {
        console.error(' ❌ ERRO AO LISTAR TRANSAÇÕES ❌ ', error.message);
        return res.status(500).json({ error: '❌ ERRO AO LISTAR TRANSAÇÕES ❌' + error.message });
    }
});
//Endpoint do dashboard

//Transações por Categoria
router.get('/dashboard/categorias', async (req, res) => {
    const {tipo} = req.query;
    try{
        const comando = `
        SELECT c.nome, SUM(t.valor) as total
        FROM transacoes t
        INNER JOIN categorias c ON t.id_categoria = c.id_categoria
        WHERE t.tipo = $1
        GROUP BY c.nome
        ORDER BY total DESC
        `;
        if (!tipo) {
            return res.status(400).json({ message: 'Informe o tipo (E ou S)' });
        }
        const resultado = await BD.query(comando, [tipo.toUpperCase()]);
        return res.status(200).json(resultado.rows);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})
router.get('/dashboard/subcategorias', async (req, res) => {
    const {tipo} = req.query;
    try{
        const comando = `
        SELECT s.nome, SUM(t.valor) as total
        FROM transacoes t
        INNER JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
        WHERE t.tipo = $1
        GROUP BY s.nome
        ORDER BY total DESC
        `;
        if (!tipo) {
            return res.status(400).json({ message: 'Informe o tipo (E ou S)' });
        }
        const resultado = await BD.query(comando, [tipo.toUpperCase()]);
        return res.status(200).json(resultado.rows);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})
router.get('/dashboard/maiores-gastos', async(req,res) => {
    try{
        const comando = `
        SELECT descricao, valor, TO_CHAR(data_registro, 'DD/MM/YYYY')
        FROM transacoes
        WHERE tipo = 'S'
        ORDER BY valor DESC
        LIMIT 5
        `;
        const resultado = await BD.query(comando);
        return res.status(200).json(resultado.rows);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
})

export default router;