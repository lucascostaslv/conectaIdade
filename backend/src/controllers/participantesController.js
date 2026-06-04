const repo = require('../repositories/participantesRepository');

module.exports = {
  listar: (req, res) => res.json(repo.findAll()),

  buscar: (req, res) => {
    const item = repo.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ erro: 'Participante não encontrado' });
    res.json(item);
  },

  criar: (req, res) => {
    const item = repo.create(req.body);
    res.status(201).json(item);
  },

  atualizar: (req, res) => {
    const item = repo.update(Number(req.params.id), req.body);
    if (!item) return res.status(404).json({ erro: 'Participante não encontrado' });
    res.json(item);
  },

  remover: (req, res) => {
    const ok = repo.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Participante não encontrado' });
    res.status(204).send();
  },
};
