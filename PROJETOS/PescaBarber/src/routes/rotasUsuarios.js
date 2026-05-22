import express, { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from "bcrypt";
import {autenticarToken} from "../middlewares/autenticacao.js";
import jwt from 'jsonwebtoken';

const router = Router();
const secret_key = 'minha_chave_secreta';

//Criando o endpoint para listar todos os usuários
router.get('/usuarios', autenticarToken, async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios ORDER BY id_usuario `;

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

    const { nome, email, senha, tipo} = req.body;

    try {
        //definir a força da criptografia
        const saltRounds = 10;
        //gerando a rash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        console.log(tipo);
        
        const comando = `INSERT INTO usuarios(nome, email, senha, tipo) VALUES($1, $2, $3, $4)`;
        const valores = [nome, email, senhaCriptografada, tipo];
        
        console.log(comando);
        console.log(valores);
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
    const { nome, email, senha, tipo} = req.body

    try {

        //Verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios WHERE id_usuario = $1`, [id_usuario]);
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        //definir a força da criptografia
        const saltRounds = 10;
        //gerando a rash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        //Atualiza todos os campos da tabela(PUT substituição completa)
        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo = $4 WHERE id_usuario = $5`;
        const valores = [nome, email, senhaCriptografada, tipo, id_usuario];
        await BD.query(comando, valores);

        return res.status(200).json('Usuário atualizado com sucesso')
    }
    catch (error) {
        console.error('Erro ao atualizar usuário');
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' });
    }
});

//Rota para DELETE -> desativa os usuários
router.delete('/usuarios/:id_usuario', async (req, res) => {

    //Id recebido via parametro
    const { id_usuario } = req.params;

    try {
         const comando = `DELETE FROM usuarios WHERE id_usuario = $1`
        await BD.query(comando, [id_usuario]);
        return res.status(200).json({ message: 'Usuário desativado com sucesso' });

    } catch (error) {
        console.error('Erro ao desativar Usuário', error.message);
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
            return res.status(401).json({ message: 'Email não encontrado' });
        };

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        //Verificar Senha se são iguais
        if (!senhaCorreta ) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        //gerando token para retornar e ser usado
        const token = jwt.sign(
            { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email },
            secret_key,
            //{ expiresIn: '15m' } //tempo de expiração do token
        )

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token: token,
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
});


export default router;