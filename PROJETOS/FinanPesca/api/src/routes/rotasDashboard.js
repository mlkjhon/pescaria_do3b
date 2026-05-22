import { Router } from "express"
import { BD } from "../../db.js"
import { autenticarToken } from "../middlewares/autenticacao.js"

const router = Router();
const SECRET_KEY = 'sua_chave_secreta'

router.get('/dashboard', async (req, res) => {
    try{
        //Grafico de pizza de gastos por categoria

        const selecaoCategorias = `
        SELECT c.nome, SUM(t.valor) as total
        FROM transacoes t
        INNER JOIN categorias c ON t.id_categoria = c.id_categoria
        WHERE t.tipo = 'S'
        GROUP BY c.nome
        ORDER BY total DESC
        `;

        //5 Maiores gastos
         const selecaoMaioresGastos = `
        SELECT descricao, valor, TO_CHAR(data_registro, 'DD/MM/YYYY')
        FROM transacoes
        WHERE tipo = 'S'
        ORDER BY valor DESC
        LIMIT 5
        `;

        //Card de resumo do mes
        const selecaoResumoMes = `
        SELECT 
            SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) AS entradas,
            SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) AS saidas,
            SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) - SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) AS saldo
        FROM transacoes
        WHERE DATE_TRUNC('month', data_registro) = DATE_TRUNC('month', CURRENT_DATE)
        `;
        
        //Evolução Mensal
        const selecaoEvolucaoMensal = `
        SELECT 
           TO_CHAR(data_registro, 'MM/YYYY') AS mes,
           SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) AS entradas,
           SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) AS saidas,
           SUM(CASE WHEN tipo = 'S' THEN valor ELSE 0 END) - SUM(CASE WHEN tipo = 'E' THEN valor ELSE 0 END) AS saldo
        FROM transacoes
        WHERE DATE_TRUNC('month', data_registro) >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '5 months'
        GROUP BY mes
        ORDER BY mes
        `;

        //Consulta com as ultimas 5 transações
        const selecaoUltimasTransacoes = `
        SELECT 
            descricao,
            valor,
            tipo,
            TO_CHAR(data_registro, 'DD/MM/YYYY') AS data_registro
        FROM transacoes
        ORDER BY data_registro DESC
        LIMIT 5
        `;

        const resCategorias = await BD.query(selecaoCategorias);
        const resMaioresGastos = await BD.query(selecaoMaioresGastos);
        const resResumoMes = await BD.query(selecaoResumoMes);
        const resEvolucaoMensal = await BD.query(selecaoEvolucaoMensal);
        const resUltimasTransacoes = await BD.query(selecaoUltimasTransacoes);

        //objeto com todos os dados
        const dadosDashboard = {
            resumoCategorias: resCategorias.rows,
            maioresGastos: resMaioresGastos.rows,
            resumoMes: resResumoMes.rows[0] || {entradas:0, saidas:0, saldo:0},
            evolucaoMensal: resEvolucaoMensal.rows,
            ultimasTransacoes: resUltimasTransacoes.rows
        }
        return res.status(200).json(dadosDashboard);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default router;
