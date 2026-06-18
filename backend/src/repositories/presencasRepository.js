const { Presenca } = require('../models');

module.exports = {
  findAll: () => Presenca.findAll(),

  findById: (id) => Presenca.findByPk(id),

  findByOficina: (oficinaId) => Presenca.findAll({ where: { oficinaId } }),

  findByParticipante: (participanteId) => Presenca.findAll({ where: { participanteId } }),

  create: (dados) => Presenca.create(dados),

  remove: async (id) => {
    const item = await Presenca.findByPk(id);
    if (!item) return false;
    await item.destroy();
    return true;
  },
};
