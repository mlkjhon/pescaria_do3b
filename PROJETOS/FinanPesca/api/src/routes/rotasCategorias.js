import express, { Router } from "express";
import { BD } from "../../db.js";
const router = Router();

//Criando o endpoint para listar todos os usuários
router.get('/categorias', async (req, res) => {
    try {
        const comando = `SELECT * FROM categorias WHERE ativo = true`;

        //Cria uma variável para receber o retorno do SQL
        const categorias = await BD.query(comando);

        //Retorno para a pagina, o json com os dados buscados do SQL
        res.status(200).json(categorias.rows);
    }
    catch (error) {
        console.error(' ❌ ERRO AO LISTAR CATEGORIAS ❌ ', error.message);
        res.status(500).json({ error: '❌ ERRO AO LISTAR CATEGORIAS ❌' })
    }
});

//endpoint seguro contra sql injection
router.post('/categorias', async (req, res) => {

    const { nome, descricao, cor, icone, tipo } = req.body;

    try {
        const comando = `INSERT INTO categorias(nome, descricao, cor, icone, tipo) VALUES($1, $2, $3, $4, $5)`;
        const valores = [nome, descricao, cor, icone, tipo];

        await BD.query(comando, valores);
        console.log(comando, valores);

        return res.status(201).json('Categoria cadastrada');
    } catch (error) {
        console.error('Erro ao cadastrar categorias', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar categorias' });
    }
});

//Endpoint para atualizar um unico usuario recebendo o parametro pelo id e buscando o usuario
router.put('/usuarios/:id_usuario', async (req, res) => {

    //Id recebido via parametro
    const { id_usuario } = req.params;
    //Dados do Usuario via corpo da pagina
    const { nome, email, senha, tipo_acesso} = req.body

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
        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo_acesso = $4 WHERE id_usuario = $5`;
        const valores = [nome, email, senhaCriptografada, tipo_acesso, id_usuario];
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
        const comando = `UPDATE usuarios SET ativo = false WHERE id_usuario = $1`
        // const comando = `DELETE FROM usuarios WHERE id_usuario = $1`
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

        return res.status(200).json({
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
});


export default router;