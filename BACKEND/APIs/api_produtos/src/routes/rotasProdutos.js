import express, { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os usuários
router.get('/produtos', async (req, res) => {
    try {
        const query = `SELECT * FROM produtos ORDER BY id_produto`;

        //Cria uma variável para receber o retorno do SQL
        const produtos = await BD.query(query);

        //Retorno para a pagina, o json com os dados buscados do SQL
        res.status(200).json(produtos.rows)

    }
    catch (error) {
        console.error(' Erro ao listar Produtos ', error.message);
        res.status(500).json({ error: 'Erro ao listar Produtos' })
    }
});

//endpoint seguro contra sql injection
router.post('/produtos', async (req, res) => {

    const { nome, preco, link_imagem, link_produto, categoria, frete } = req.body;

    try {
        const comando = `INSERT INTO produtos (nome, preco, link_imagem, link_produto, categoria, frete) 
            VALUES($1, $2, $3, $4, $5, $6) `;
        const valores = [nome, preco, link_imagem, link_produto, categoria, frete];

        await BD.query(comando, valores);
        console.log(comando, valores);



        res.status(201).json('Produto cadastrado');
    } catch (error) {
        console.error('Erro ao cadastrar Produto', error.message);
        res.status(500).json({ error: 'Erro ao cadastrar Produto' });
    }

});

//Endpoint para atualizar um unico usuario recebendo o parametro pelo id e buscando o usuario
router.put('/produtos/:id_produto', async (req, res) => {
    //Id recebido via parametro 
    const { id_produto } = req.params;

    //Dados do Usuario via corpo da pagina
    const { nome, preco, link_imagem, link_produto, categoria, frete } = req.body

    try {
        //Verificar se o ordem existe
        const verificarProduto = await BD.query(`SELECT * FROM produtos WHERE id_produto = $1`, [id_produto]);
        if (verificarProduto.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }
        //Atualiza todos os campos da tabela(PUT substituição completa)
        const comando = `UPDATE produtos 
        SET nome = $1, preco = $2, link_imagem = $3, link_produto = $4, categoria = $5, frete = $6 WHERE id_produto = $7`;
        const valores = [nome, preco, link_imagem, link_produto, categoria, frete, id_produto];
        await BD.query(comando, valores);

        return res.status(200).json('Produto atualizado com sucesso')
    }
    catch (error) {
        console.error('Erro ao atualizar Produto');
        return res.status(500).json({ error: 'Erro ao atualizar Produto' });
    }
});

//Rota Patch -> Atualizando parcialmente as informações
router.patch('/produtos/:id_produto', async (req, res) => {

    //Id recebido via parametro 
    const { id_produto } = req.params;
    //Dadepartamentoid_departamento via corpo da pagina
    const { nome, preco, link_imagem, link_produto, categoria, frete } = req.body

    try {
        //Verificar se o ordem existe
        const verificarProduto = await BD.query(`SELECT * FROM produtos WHERE id_produto = $1`, [id_produto]);
        if (verificarProduto.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }

        //Montar o update dinanmicamente (apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome);
            contador++;
        };

        if (preco !== undefined) {
            campos.push(`preco = $${contador}`);
            valores.push(preco);
            contador++;
        };

        if (link_imagem !== undefined) {
            campos.push(`link_imagem = $${contador}`);
            valores.push(link_imagem);
            contador++;
        };

        if (link_produto !== undefined) {
            campos.push(`link_produto = $${contador}`);
            valores.push(link_produto);
            contador++;
        };

        if (categoria !== undefined) {
            campos.push(`categoria = $${contador}`);
            valores.push(categoria);
            contador++;
        };

        if (frete !== undefined) {
            campos.push(`frete = $${contador}`);
            valores.push(frete);
            contador++;
        };

        //Se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo a atualizar' });
        };

        //Adicionando o ID ao fianl de valores
        valores.push(id_produto);

        //Monatndo a query dinamicamente
        const comando = `UPDATE produtos SET ${campos.join(`, `)} WHERE id_produto = $${contador} `
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Produto atualizado com sucesso' })

    } catch (error) {
        console.error('Erro ao atualizar Produto', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor ' + error.message });
    }
});

//Rota para DELETE -> deletar a ordens de serviços
router.delete('/produtos/:id_produto', async (req, res) => {

    //Id recebido via parametro 
    const { id_produto } = req.params;

    try {
        const comando = `DELETE FROM produtos WHERE id_produto = $1`
        await BD.query(comando, [id_produto]);
        return res.status(200).json({ message: 'Produto removido com sucesso' });

    } catch (error) {
        console.error('Erro ao deletar Produto', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' + error.message });
    }
});


export default router;