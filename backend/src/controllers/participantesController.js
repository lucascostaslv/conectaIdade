const repo = require('../repositories/participantesRepository');

const DATA_RE = /^\d{4}-\d{2}-\d{2}$/;

module.exports = {
  listar: (req, res) => {
    let resultado = repo.findAll();
    if (req.query.nome) {
      const filtro = req.query.nome.toLowerCase();
      resultado = resultado.filter(
        (p) => p.nome && p.nome.toLowerCase().includes(filtro)
      );
    }
    res.json(resultado);
  },

  buscar: (req, res) => {
    const item = repo.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ erro: 'Participante não encontrado' });
    res.json(item);
  },

  criar: (req, res) => {
    const { nome, telefone, email, dataNascimento } = req.body;
    const erros = [];
    if (!nome || typeof nome !== 'string' || !nome.trim())
      erros.push('nome é obrigatório');
    if (!telefone && !email)
      erros.push('informe pelo menos telefone ou email');
    if (!dataNascimento || !DATA_RE.test(dataNascimento))
      erros.push('dataNascimento é obrigatória e deve estar no formato YYYY-MM-DD');
    if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

    const item = repo.create(req.body);
    res.status(201).json(item);
  },

  atualizar: (req, res) => {
    const { nome, dataNascimento } = req.body;
    const erros = [];
    if (nome !== undefined && (typeof nome !== 'string' || !nome.trim()))
      erros.push('nome deve ser uma string não vazia');
    if (dataNascimento !== undefined && !DATA_RE.test(dataNascimento))
      erros.push('dataNascimento deve estar no formato YYYY-MM-DD');
    if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

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
