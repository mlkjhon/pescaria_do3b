import express from "express";
import livroController from "../controllers/livroController.js";

const router = express.Router();

//Rota para Listar os livros
router.get('/livros', livroController.listar);

//Rota para Adicionar livros
router.post('/livros', livroController.adicionar);

//Rota para Marcar como lida
router.post('/livros/marcar-lido', livroController.marcarComoLido);

export default router;