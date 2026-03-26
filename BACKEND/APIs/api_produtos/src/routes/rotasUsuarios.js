import express, { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//Criando o endpoint para listar todos os usuários
router.get('/usuarios', async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios ORDER BY id_usuario`;

        //Cria uma variável para receber o retorno do SQL
        const usuarios = await BD.query(query);

        //Retorno para a pagina, o json com os dados buscados do SQL
        res.status(200).json(usuarios.rows);
    }
    catch (error) {
        console.error(' ❌ ERRO AO LISTAR USUÁRIOS ❌ ', error.message);
        res.status(500).json({ error: '❌ ERRO AO LISTAR USUÁRIOS ❌' })
    }
});

//endpoint seguro contra sql injection
router.post('/usuarios', async (req, res) => {

    const { nome, email, senha } = req.body;

    try {
        const comando = `INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3)`;
        const valores = [nome, email, senha];

        await BD.query(comando, valores);
        console.log(comando, valores);

        return res.status(201).json('Usuário cadastrado');
    } catch (error) {
        console.error('Erro ao cadastrado usuarios', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' });
    }
});

//Endpoint para atualizar um unico usuario recebendo o parametro pelo id e buscando o usuario
router.put('/usuarios/:id_usuario', async (req, res) => {

    //Id recebido via parametro 
    const { id_usuario } = req.params;
    //Dados do Usuario via corpo da pagina
    const { nome, email, senha } = req.body

    try {
        //Verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios WHERE id_usuario = $1`, [id_usuario]);
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        //Atualiza todos os campos da tabela(PUT substituição completa)
        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id_usuario = $4`;
        const valores = [nome, email, senha, id_usuario];
        await BD.query(comando, valores);

        return res.status(200).json('Usuário atualizado com sucesso')
    }
    catch (error) {
        console.error('Erro ao atualizar usuário');
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' });
    }
});

//Rota Patch -> Atualizando parcialmente as informações
router.patch('/usuarios/:id_usuario', async (req, res) => {

    //Id recebido via parametro 
    const { id_usuario } = req.params;
    //Dados do Usuario via corpo da pagina
    const { nome, email, senha } = req.body;

    try {
        //Verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios WHERE id_usuario = $1`, [id_usuario]);
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
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

        if (email !== undefined) {
            campos.push(`email = $${contador}`);
            valores.push(email);
            contador++;
        };

        if (senha !== undefined) {
            campos.push(`senha = $${contador}`);
            valores.push(senha);
            contador++;
        };

        //Se nenhum campo foi enviado
        if (campos.length === 0) {
            return res.status(400).json({ message: 'Nenhum campo a atualizar' });
        };

        //Adicionando o ID ao fianl de valores
        valores.push(id_usuario);

        //Monatndo a query dinamicamente
        const comando = `UPDATE usuarios SET ${campos.join(`, `)} WHERE id_usuario = $${contador} `
        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Usuário Atualizado com sucesso' })

    } catch (error) {
        console.error('Erro ao atualizar Usuário', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' + error.message });
    }
});

//Rota para DELETE -> deletar os usuários
router.delete('/usuarios/:id_usuario', async (req, res) => {

    //Id recebido via parametro 
    const { id_usuario } = req.params;

    try {
        const comando = `DELETE FROM usuarios WHERE id_usuario = $1`
        await BD.query(comando, [id_usuario]);
        return res.status(200).json({ message: 'Usuário removido com sucesso' });

    } catch (error) {
        console.error('Erro ao deletar Usuário', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' + error.message });
    }
});

//End Point de Login
router.post('/login', async (req, res) => {

    const {email, senha} = req.body;

    //Validação de Entrada
    if (!email || !senha) {
        return res.return(400).json({ message: 'Email e senha são obrigatórios' });
    }
    try {
        //Buscar usuário pelo email
        const comando = `SELECT id_usuario, nome, email, senha FROM usuarios WHERE email =$1`;
        const resultado = await BD.query(comando, [email]);

        if (resultado.rows.length === 0) {
            return res.return(401).json({ message: 'Email não encontrado' });
        };

        const usuario = resultado.rows[0];

        //Verificar Senha se são iguais
        if (usuario.senha !== senha ) {
            return res.return(401).json({ message: 'Senha inválida' });
        }

        returnres.status(200).json({
            message: 'Login realizado com sucesso',
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Erro ao atualizar Usuário', error.message);
        return res.status(500).json({ message: 'Erro interno no servidor' + error.message });
    }
})

export default router;