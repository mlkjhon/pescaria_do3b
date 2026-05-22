import express, { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os usuários
router.get('/subcategorias', async (req, res) => {
    try {
        const query = `SELECT * FROM subcategorias WHERE ativo = true ORDER BY id_subcategoria `;

        //Cria uma variável para receber o retorno do SQL
        const subcategorias = await BD.query(query);

        //Retorno para a pagina, o json com os dados buscados do SQL
        res.status(200).json(subcategorias.rows);
    }
    catch (error) {
        console.error(' ❌ ERRO AO LISTAR SUBCATEGORIA ❌ ', error.message);
        res.status(500).json({ error: '❌ ERRO AO LISTAR SUBCATEGORIA ❌' })
    }
});

//endpoint seguro contra sql injection
router.post('/subcategorias', async (req, res) => {

    const { nome, ativo, id_categoria } = req.body;

    try {
        const comando = `INSERT INTO subcategorias(nome, ativo, id_categoria) VALUES($1, $2, $3)`;
        const valores = [nome, ativo, id_categoria];

        await BD.query(comando, valores);
        console.log(comando, valores);

        return res.status(201).json('SubCategoria cadastrada');
    } catch (error) {
        console.error('Erro ao cadastrar subcategoria', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar subcategoria' });
    }
});

//Endpoint para atualizar um unico usuario recebendo o parametro pelo id e buscando o usuario
router.put('/subcategorias/:id_subcategoria', async (req, res) => {

    //Id recebido via parametro
    const { id_subcategoria } = req.params;
    //Dados do Usuario via corpo da pagina
    const { nome, ativo, id_categoria } = req.body

    try {
        //Verificar se o usuario existe
        const verificarSubCategoria = await BD.query(`SELECT * FROM subcategorias WHERE id_subcategoria = $1`, [id_subcategoria]);
        if (verificarSubCategoria.rows.length === 0) {
            return res.status(404).json({ message: 'SubCategoria não encontrada' })
        }

        //Atualiza todos os campos da tabela(PUT substituição completa)
        const comando = `UPDATE subcategorias SET nome = $1, ativo = $2, id_categoria = $3 WHERE id_subcategoria = $4`;
        const valores = [nome, ativo, id_categoria, id_subcategoria];
        await BD.query(comando, valores);

        return res.status(200).json('SubCategoria atualizada com sucesso')
    }
    catch (error) {
        console.error('Erro ao atualizar subcategoria');
        return res.status(500).json({ error: 'Erro ao atualizar subcategorias' });
    }
});

//Rota para DELETE -> desativa os usuários
router.delete('/subcategorias/:id_subcategoria', async (req, res) => {

    //Id recebido via parametro
    const { id_subcategoria } = req.params;

    try {
        const comando = `UPDATE subcategorias SET ativo = false WHERE id_subcategoria = $1`
        // const comando = `DELETE FROM usuarios WHERE id_usuario = $1`
        await BD.query(comando, [id_subcategoria]);
        return res.status(200).json({ message: 'SubCategoria desativada com sucesso' });

    } catch (error) {
        console.error('Erro ao desativar SubCategoria', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' + error.message });
    }
});



export default router;