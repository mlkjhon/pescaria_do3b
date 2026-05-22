import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// Listar todos os serviços
router.get('/servicos', async (req, res) => {
    try {
        const query = `SELECT * FROM servicos ORDER BY nome`;
        const resultado = await BD.query(query);
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('❌ ERRO AO LISTAR SERVIÇOS ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO LISTAR SERVIÇOS ❌' });
    }
});

// Cadastrar novo serviço
router.post('/servicos', async (req, res) => {
    const { nome, preco, descricao, especialidade, duracao_minutos } = req.body;
    try {
        const query = `INSERT INTO servicos (nome, preco, descricao, especialidade, duracao_minutos) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const valores = [nome, preco, descricao, especialidade, duracao_minutos];
        const resultado = await BD.query(query, valores);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('❌ ERRO AO CADASTRAR SERVIÇO ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO CADASTRAR SERVIÇO ❌' });
    }
});

// Atualizar um serviço
router.put('/servicos/:id_servico', async (req, res) => {
    const { id_servico } = req.params;
    const { nome, preco, descricao, especialidade, duracao_minutos } = req.body;
    try {
        const query = `UPDATE servicos SET nome = $1, preco = $2, descricao = $3, especialidade = $4, duracao_minutos = $5 WHERE id_servico = $6 RETURNING *`;
        const valores = [nome, preco, descricao, especialidade, duracao_minutos, id_servico];
        const resultado = await BD.query(query, valores);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error('❌ ERRO AO ATUALIZAR SERVIÇO ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO ATUALIZAR SERVIÇO ❌' });
    }
});

// Deletar um serviço
router.delete('/servicos/:id_servico', async (req, res) => {
    const { id_servico } = req.params;
    try {
        const query = `DELETE FROM servicos WHERE id_servico = $1`;
        const resultado = await BD.query(query, [id_servico]);
        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.status(200).json({ message: 'Serviço excluído com sucesso' });
    } catch (error) {
        console.error('❌ ERRO AO EXCLUIR SERVIÇO ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO EXCLUIR SERVIÇO ❌' });
    }
});

export default router;

