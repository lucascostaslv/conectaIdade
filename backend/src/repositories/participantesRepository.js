const { Op } = require('sequelize');
const { Participante } = require('../models');

module.exports = {
  findAll: (filtros = {}) => {
    const where = {};
    if (filtros.nome) where.nome = { [Op.like]: `%${filtros.nome}%` };
    return Participante.findAll({ where });
  },

  findById: (id) => Participante.findByPk(id),

  create: (dados) => Participante.create(dados),

  update: async (id, dados) => {
    const item = await Participante.findByPk(id);
    if (!item) return null;
    return item.update(dados);
  },

  remove: async (id) => {
    const item = await Participante.findByPk(id);
    if (!item) return false;
    await item.destroy();
    return true;
  },
};
