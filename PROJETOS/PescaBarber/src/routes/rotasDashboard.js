import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

// Rota unificada do painel administrativo
router.get('/dashboard', async (req, res) => {
    try {

        // 1️⃣ Resumo do mês: faturamento total, confirmados e cancelados
        const queryResumoMes = `
            SELECT
                COALESCE(SUM(preco), 0)                                              AS faturamento_total,
                COUNT(*) FILTER (WHERE LOWER(status) = 'confirmado')                AS confirmados,
                COUNT(*) FILTER (WHERE LOWER(status) = 'cancelado')                 AS cancelados
            FROM agendamento
            WHERE
                EXTRACT(MONTH FROM dia_hora) = EXTRACT(MONTH FROM CURRENT_DATE)
                AND EXTRACT(YEAR  FROM dia_hora) = EXTRACT(YEAR  FROM CURRENT_DATE)
        `;
        const resultadoResumoMes = await BD.query(queryResumoMes);

        // 2️⃣ Serviços mais procurados: nome do serviço e quantidade de agendamentos
        const queryServicosMaisProcurados = `
            SELECT
                s.nome   AS nome_servico,
                COUNT(*) AS quantidade
            FROM agendamento a
            JOIN servicos s ON a.id_servico = s.id_servico
            GROUP BY s.nome
            ORDER BY quantidade DESC
            LIMIT 5
        `;
        const resultadoServicosMaisProcurados = await BD.query(queryServicosMaisProcurados);

        // 3️⃣ Próximos agendamentos: data, nome do cliente, nome do barbeiro e nome do serviço
        const queryProximosAgendamentos = `
            SELECT
                a.dia_hora                AS data,
                cliente.nome              AS nome_cliente,
                barbeiro.nome             AS nome_barbeiro,
                s.nome                    AS nome_servico
            FROM agendamento a
            JOIN usuarios  cliente  ON a.id_cliente  = cliente.id_usuario
            JOIN usuarios  barbeiro ON a.id_barbeiro = barbeiro.id_usuario
            JOIN servicos  s        ON a.id_servico  = s.id_servico
            WHERE a.dia_hora >= NOW()
            ORDER BY a.dia_hora ASC
            LIMIT 10
        `;
        const resultadoProximosAgendamentos = await BD.query(queryProximosAgendamentos);

        // 4️⃣ Fidelidade dos clientes: nome, quantas vezes frequentou e gasto total
        const queryFidelidadeClientes = `
            SELECT
                u.nome              AS nome_cliente,
                COUNT(*)            AS visitas,
                COALESCE(SUM(a.preco), 0) AS gasto_total
            FROM agendamento a
            JOIN usuarios u ON a.id_cliente = u.id_usuario
            GROUP BY u.nome
            ORDER BY visitas DESC, gasto_total DESC
            LIMIT 10
        `;
        const resultadoFidelidadeClientes = await BD.query(queryFidelidadeClientes);

        // Retorna todos os dados consolidados em uma única resposta JSON
        res.status(200).json({
            resumo_mes:              resultadoResumoMes.rows[0],
            servicos_mais_procurados: resultadoServicosMaisProcurados.rows,
            proximos_agendamentos:   resultadoProximosAgendamentos.rows,
            fidelidade_clientes:     resultadoFidelidadeClientes.rows
        });

    } catch (error) {
        console.error('❌ ERRO AO CARREGAR DASHBOARD ❌', error.message);
        res.status(500).json({ error: '❌ ERRO AO CARREGAR DASHBOARD ❌' });
    }
});

export default router;
