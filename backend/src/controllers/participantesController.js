const repo = require('../repositories/participantesRepository');

const DATA_RE = /^\d{4}-\d{2}-\d{2}$/;

module.exports = {
  listar: async (req, res) => {
    try {
      const resultado = await repo.findAll(req.query.nome ? { nome: req.query.nome } : {});
      res.json(resultado);
    } catch {
      res.status(500).json({ erro: 'Erro interno ao listar participantes' });
    }
  },

  buscar: async (req, res) => {
    try {
      const item = await repo.findById(Number(req.params.id));
      if (!item) return res.status(404).json({ erro: 'Participante não encontrado' });
      res.json(item);
    } catch {
      res.status(500).json({ erro: 'Erro interno' });
    }
  },

  criar: async (req, res) => {
    try {
      const { nome, telefone, email, dataNascimento } = req.body;
      const erros = [];
      if (!nome || typeof nome !== 'string' || !nome.trim())
        erros.push('nome é obrigatório');
      if (!telefone && !email)
        erros.push('informe pelo menos telefone ou email');
      if (!dataNascimento || !DATA_RE.test(dataNascimento))
        erros.push('dataNascimento é obrigatória e deve estar no formato YYYY-MM-DD');
      if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

      const item = await repo.create(req.body);
      res.status(201).json(item);
    } catch {
      res.status(500).json({ erro: 'Erro interno ao criar participante' });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { nome, dataNascimento } = req.body;
      const erros = [];
      if (nome !== undefined && (typeof nome !== 'string' || !nome.trim()))
        erros.push('nome deve ser uma string não vazia');
      if (dataNascimento !== undefined && !DATA_RE.test(dataNascimento))
        erros.push('dataNascimento deve estar no formato YYYY-MM-DD');
      if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

      const item = await repo.update(Number(req.params.id), req.body);
      if (!item) return res.status(404).json({ erro: 'Participante não encontrado' });
      res.json(item);
    } catch {
      res.status(500).json({ erro: 'Erro interno ao atualizar participante' });
    }
  },

  remover: async (req, res) => {
    try {
      const ok = await repo.remove(Number(req.params.id));
      if (!ok) return res.status(404).json({ erro: 'Participante não encontrado' });
      res.status(204).send();
    } catch {
      res.status(500).json({ erro: 'Erro interno ao remover participante' });
    }
  },
};
