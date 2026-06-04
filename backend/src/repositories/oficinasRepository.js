const Oficina = require('../models/Oficina');

let oficinas = [];
let nextId = 1;

module.exports = {
  findAll: () => oficinas,

  findById: (id) => oficinas.find((o) => o.id === id),

  create: (dados) => {
    const oficina = new Oficina({ id: nextId++, ...dados });
    oficinas.push(oficina);
    return oficina;
  },

  update: (id, dados) => {
    const index = oficinas.findIndex((o) => o.id === id);
    if (index === -1) return null;
    oficinas[index] = { ...oficinas[index], ...dados };
    return oficinas[index];
  },

  remove: (id) => {
    const index = oficinas.findIndex((o) => o.id === id);
    if (index === -1) return false;
    oficinas.splice(index, 1);
    return true;
  },
};
