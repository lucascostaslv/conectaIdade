const repo = require('../repositories/progressosRepository');
const participantesRepo = require('../repositories/participantesRepository');
const oficinasRepo = require('../repositories/oficinasRepository');

module.exports = {
  listar: async (req, res) => {
    try {
      res.json(await repo.findAll());
    } catch {
      res.status(500).json({ erro: 'Erro interno ao listar progressos' });
    }
  },

  listarPorParticipante: async (req, res) => {
    try {
      res.json(await repo.findByParticipante(Number(req.params.participanteId)));
    } catch {
      res.status(500).json({ erro: 'Erro interno' });
    }
  },

  listarPorOficina: async (req, res) => {
    try {
      res.json(await repo.findByOficina(Number(req.params.oficinaId)));
    } catch {
      res.status(500).json({ erro: 'Erro interno' });
    }
  },

  buscar: async (req, res) => {
    try {
      const item = await repo.findById(Number(req.params.id));
      if (!item) return res.status(404).json({ erro: 'Progresso não encontrado' });
      res.json(item);
    } catch {
      res.status(500).json({ erro: 'Erro interno' });
    }
  },

  criar: async (req, res) => {
    try {
      const { participanteId, oficinaId } = req.body;
      const erros = [];
      const pId = Number(participanteId);
      const oId = Number(oficinaId);
      if (!participanteId || isNaN(pId)) erros.push('participanteId é obrigatório e deve ser um número');
      if (!oficinaId    || isNaN(oId)) erros.push('oficinaId é obrigatório e deve ser um número');
      if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

      if (!await participantesRepo.findById(pId))
        return res.status(404).json({ erro: 'Participante não encontrado' });
      if (!await oficinasRepo.findById(oId))
        return res.status(404).json({ erro: 'Oficina não encontrada' });

      const item = await repo.create({ ...req.body, participanteId: pId, oficinaId: oId });
      res.status(201).json(item);
    } catch {
      res.status(500).json({ erro: 'Erro interno ao criar progresso' });
    }
  },

  atualizar: async (req, res) => {
    try {
      const item = await repo.update(Number(req.params.id), req.body);
      if (!item) return res.status(404).json({ erro: 'Progresso não encontrado' });
      res.json(item);
    } catch {
      res.status(500).json({ erro: 'Erro interno ao atualizar progresso' });
    }
  },

  remover: async (req, res) => {
    try {
      const ok = await repo.remove(Number(req.params.id));
      if (!ok) return res.status(404).json({ erro: 'Progresso não encontrado' });
      res.status(204).send();
    } catch {
      res.status(500).json({ erro: 'Erro interno ao remover progresso' });
    }
  },
};
