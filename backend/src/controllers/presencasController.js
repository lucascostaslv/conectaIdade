const repo = require('../repositories/presencasRepository');

module.exports = {
  listar: (req, res) => res.json(repo.findAll()),

  listarPorOficina: (req, res) =>
    res.json(repo.findByOficina(Number(req.params.oficinaId))),

  listarPorParticipante: (req, res) =>
    res.json(repo.findByParticipante(Number(req.params.participanteId))),

  registrar: (req, res) => {
    const item = repo.create(req.body);
    res.status(201).json(item);
  },

  remover: (req, res) => {
    const ok = repo.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Presença não encontrada' });
    res.status(204).send();
  },
};
