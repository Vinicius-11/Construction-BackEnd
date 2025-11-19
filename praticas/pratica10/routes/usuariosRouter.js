const express = require('express');
const usuarioController = require('../controllers/usuarioController.js');
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/', usuarioController.criar);

router.post('/login', usuarioController.entrar);

router.post('/renovar',  verificarToken, usuarioController.renovar);

router.delete('/:id', verificarToken, usuarioController.remover);

module.exports = router;