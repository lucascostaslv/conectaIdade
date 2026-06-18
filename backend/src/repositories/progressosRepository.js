const { Progresso } = require('../models');

module.exports = {
  findAll: () => Progresso.findAll(),

  findById: (id) => Progresso.findByPk(id),

  findByParticipante: (participanteId) => Progresso.findAll({ where: { participanteId } }),

  findByOficina: (oficinaId) => Progresso.findAll({ where: { oficinaId } }),

  create: (dados) => Progresso.create(dados),

  update: async (id, dados) => {
    const item = await Progresso.findByPk(id);
    if (!item) return null;
    return item.update(dados);
  },

  remove: async (id) => {
    const item = await Progresso.findByPk(id);
    if (!item) return false;
    await item.destroy();
    return true;
  },
};
