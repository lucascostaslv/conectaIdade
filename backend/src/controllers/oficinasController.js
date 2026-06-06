const repo = require('../repositories/oficinasRepository');

const DATA_RE = /^\d{4}-\d{2}-\d{2}$/;

module.exports = {
  listar: (req, res) => {
    let resultado = repo.findAll();
    if (req.query.titulo) {
      const filtro = req.query.titulo.toLowerCase();
      resultado = resultado.filter(
        (o) => o.titulo && o.titulo.toLowerCase().includes(filtro)
      );
    }
    res.json(resultado);
  },

  buscar: (req, res) => {
    const item = repo.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ erro: 'Oficina não encontrada' });
    res.json(item);
  },

  criar: (req, res) => {
    const { titulo, educador, dataInicio, cargaHoraria } = req.body;
    const erros = [];
    if (!titulo || typeof titulo !== 'string' || !titulo.trim())
      erros.push('titulo é obrigatório');
    if (!educador || typeof educador !== 'string' || !educador.trim())
      erros.push('educador é obrigatório');
    if (!dataInicio || !DATA_RE.test(dataInicio))
      erros.push('dataInicio é obrigatória e deve estar no formato YYYY-MM-DD');
    const carga = Number(cargaHoraria);
    if (!cargaHoraria || isNaN(carga) || carga <= 0)
      erros.push('cargaHoraria é obrigatória e deve ser um número positivo');
    if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

    const item = repo.create(req.body);
    res.status(201).json(item);
  },

  atualizar: (req, res) => {
    const { titulo, educador, dataInicio, dataFim, cargaHoraria } = req.body;
    const erros = [];
    if (titulo !== undefined && (typeof titulo !== 'string' || !titulo.trim()))
      erros.push('titulo deve ser uma string não vazia');
    if (educador !== undefined && (typeof educador !== 'string' || !educador.trim()))
      erros.push('educador deve ser uma string não vazia');
    if (dataInicio !== undefined && !DATA_RE.test(dataInicio))
      erros.push('dataInicio deve estar no formato YYYY-MM-DD');
    if (dataFim !== undefined && !DATA_RE.test(dataFim))
      erros.push('dataFim deve estar no formato YYYY-MM-DD');
    if (cargaHoraria !== undefined) {
      const carga = Number(cargaHoraria);
      if (isNaN(carga) || carga <= 0) erros.push('cargaHoraria deve ser um número positivo');
    }
    if (erros.length) return res.status(400).json({ erro: 'Dados inválidos', campos: erros });

    const item = repo.update(Number(req.params.id), req.body);
    if (!item) return res.status(404).json({ erro: 'Oficina não encontrada' });
    res.json(item);
  },

  remover: (req, res) => {
    const ok = repo.remove(Number(req.params.id));
    if (!ok) return res.status(404).json({ erro: 'Oficina não encontrada' });
    res.status(204).send();
  },
};
