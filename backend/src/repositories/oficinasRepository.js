const { Op } = require('sequelize');
const { Oficina } = require('../models');

module.exports = {
  findAll: (filtros = {}) => {
    const where = {};
    if (filtros.titulo) where.titulo = { [Op.like]: `%${filtros.titulo}%` };
    return Oficina.findAll({ where });
  },

  findById: (id) => Oficina.findByPk(id),

  create: (dados) => Oficina.create(dados),

  update: async (id, dados) => {
    const item = await Oficina.findByPk(id);
    if (!item) return null;
    return item.update(dados);
  },

  remove: async (id) => {
    const item = await Oficina.findByPk(id);
    if (!item) return false;
    await item.destroy();
    return true;
  },
};
