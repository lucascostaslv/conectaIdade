const repo = require('../repositories/progressosRepository');
const participantesRepo = require('../repositories/participantesRepository');
const oficinasRepo = require('../repositories/oficinasRepository');

module.exports = {
  listar: (req, res) => res.json(repo.findAll()),

  listarPorParticipante: (req, res) =>
    res.json(repo.findByParticipante(Number(req.params.participanteId))),

  listarPorOficina: (req, res) =>
    res.json(repo.findByOficina(Number(req.params.oficinaId))),

  buscar: (req, res) => {
    const item = repo.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ erro: 'Progresso não encontrado' });
    res.json(item);
  },

  criar: (req, res) => {
    const { participanteId, oficinaId } = req.body;
    const erros = [];
    const pId = Number(participanteId);
    const oId = Number(oficinaId);
    if (!participanteId || isNaN(pId)) erros.push('participanteId é obrigatório e deve ser um número');
    if (!oficinaId || isNaN(oId)) erros.push('oficinaId é obrigatório e deve ser um número');
    if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

    if (!participantesRepo.findById(pId)) return res.status(404).json({ erro: 'Participante não encontrado' });
    if (!oficinasRepo.findById(oId)) return res.status(404).json({ erro: 'Oficina não encontrada' });

    const item = repo.create({ ...req.body, participanteId: pId, oficinaId: oId });
    res.status(201).json(item);
  },

  atualizar: (req, res) => {
    const item = repo.update(Number(req.params.id), req.body);
    if (!item) return res.status(404).json({ erro: 'Progresso não encontrado' });
    res.json(item);
  },

  remover: (req, res) => {
    const ok = repo.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Progresso não encontrado' });
    res.status(204).send();
  },
};
