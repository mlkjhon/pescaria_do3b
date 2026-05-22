import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// Listar todos os agendamentos com detalhes de cliente, barbeiro e serviço
router.get('/agendamentos', async (req, res) => {
    try {
        const query = `
            SELECT 
                a.id_agendamento, 
                a.dia_hora, 
                a.preco, 
                a.status,
                u.nome as nome_cliente,
                b.nome as nome_barbeiro,
                s.nome as nome_servico,
                s.especialidade as especialidade_servico
            FROM agendamento a
            JOIN usuarios u ON a.id_cliente = u.id_usuario
            JOIN usuarios b ON a.id_barbeiro = b.id_usuario
            JOIN servicos s ON a.id_servico = s.id_servico
            ORDER BY a.dia_hora DESC
        `;
        const resultado = await BD.query(query);
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('❌ ERRO AO LISTAR AGENDAMENTOS ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO LISTAR AGENDAMENTOS ❌' });
    }
});

// Cadastrar novo agendamento
router.post('/agendamentos', async (req, res) => {
    const { id_cliente, id_servico, id_barbeiro, dia_hora, preco, status } = req.body;
    try {
        const query = `INSERT INTO agendamento (id_cliente, id_servico, id_barbeiro, dia_hora, preco, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const valores = [id_cliente, id_servico, id_barbeiro, dia_hora, preco, status || 'Em andamento'];
        const resultado = await BD.query(query, valores);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('❌ ERRO AO CADASTRAR AGENDAMENTO ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO CADASTRAR AGENDAMENTO ❌' });
    }
});

// Atualizar um agendamento
router.put('/agendamentos/:id_agendamento', async (req, res) => {
    const { id_agendamento } = req.params;
    const { id_cliente, id_servico, id_barbeiro, dia_hora, preco, status } = req.body;
    try {
        const query = `UPDATE agendamento SET id_cliente = $1, id_servico = $2, id_barbeiro = $3, dia_hora = $4, preco = $5, status = $6 WHERE id_agendamento = $7 RETURNING *`;
        const valores = [id_cliente, id_servico, id_barbeiro, dia_hora, preco, status, id_agendamento];
        const resultado = await BD.query(query, valores);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error('❌ ERRO AO ATUALIZAR AGENDAMENTO ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO ATUALIZAR AGENDAMENTO ❌' });
    }
});

// Deletar um agendamento
router.delete('/agendamentos/:id_agendamento', async (req, res) => {
    const { id_agendamento } = req.params;
    try {
        const query = `DELETE FROM agendamento WHERE id_agendamento = $1`;
        const resultado = await BD.query(query, [id_agendamento]);
        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }
        res.status(200).json({ message: 'Agendamento excluído com sucesso' });
    } catch (error) {
        console.error('❌ ERRO AO EXCLUIR AGENDAMENTO ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO EXCLUIR AGENDAMENTO ❌' });
    }
});

export default router;
