const repo = require('../repositories/presencasRepository');
const participantesRepo = require('../repositories/participantesRepository');
const oficinasRepo = require('../repositories/oficinasRepository');

const DATA_RE = /^\d{4}-\d{2}-\d{2}$/;

module.exports = {
  listar: async (req, res) => {
    try {
      res.json(await repo.findAll());
    } catch {
      res.status(500).json({ erro: 'Erro interno ao listar presenças' });
    }
  },

  listarPorOficina: async (req, res) => {
    try {
      res.json(await repo.findByOficina(Number(req.params.oficinaId)));
    } catch {
      res.status(500).json({ erro: 'Erro interno' });
    }
  },

  listarPorParticipante: async (req, res) => {
    try {
      res.json(await repo.findByParticipante(Number(req.params.participanteId)));
    } catch {
      res.status(500).json({ erro: 'Erro interno' });
    }
  },

  registrar: async (req, res) => {
    try {
      const { participanteId, oficinaId, data, presente } = req.body;
      const erros = [];
      const pId = Number(participanteId);
      const oId = Number(oficinaId);
      if (!participanteId || isNaN(pId)) erros.push('participanteId é obrigatório e deve ser um número');
      if (!oficinaId    || isNaN(oId)) erros.push('oficinaId é obrigatório e deve ser um número');
      if (!data || !DATA_RE.test(data)) erros.push('data é obrigatória e deve estar no formato YYYY-MM-DD');
      if (presente === undefined || typeof presente !== 'boolean')
        erros.push('presente é obrigatório e deve ser true ou false');
      if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

      if (!await participantesRepo.findById(pId))
        return res.status(404).json({ erro: 'Participante não encontrado' });
      if (!await oficinasRepo.findById(oId))
        return res.status(404).json({ erro: 'Oficina não encontrada' });

      const item = await repo.create({ ...req.body, participanteId: pId, oficinaId: oId });
      res.status(201).json(item);
    } catch {
      res.status(500).json({ erro: 'Erro interno ao registrar presença' });
    }
  },

  remover: async (req, res) => {
    try {
      const ok = await repo.remove(Number(req.params.id));
      if (!ok) return res.status(404).json({ erro: 'Presença não encontrada' });
      res.status(204).send();
    } catch {
      res.status(500).json({ erro: 'Erro interno ao remover presença' });
    }
  },
};
