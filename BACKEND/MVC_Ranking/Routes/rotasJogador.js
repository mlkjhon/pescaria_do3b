import express from "express";
import jogadorController from "../Controllers/jogadorController.js";

const router = express.Router();

//Rota para Listar os livros
router.get('/jogadores', jogadorController.listar);

//Rota para Adicionar jogadores
router.post('/jogadores', jogadorController.adicionar);

//Rota para Marcar como lida
router.post('/jogadores/adicionar-pontos', jogadorController.adicionarPontos);

export default router;