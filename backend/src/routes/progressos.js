const express = require('express');
const router = express.Router();
const controller = require('../controllers/progressosController');

router.get('/', controller.listar);
router.get('/participante/:participanteId', controller.listarPorParticipante);
router.get('/oficina/:oficinaId', controller.listarPorOficina);
router.get('/:id', controller.buscar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.remover);

module.exports = router;
