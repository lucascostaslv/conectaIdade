const express = require('express');
const router = express.Router();
const controller = require('../controllers/presencasController');

router.get('/', controller.listar);
router.get('/oficina/:oficinaId', controller.listarPorOficina);
router.get('/participante/:participanteId', controller.listarPorParticipante);
router.post('/', controller.registrar);
router.delete('/:id', controller.remover);

module.exports = router;
