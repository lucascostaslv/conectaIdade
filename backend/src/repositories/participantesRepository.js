const Participante = require('../models/Participante');

let participantes = [];
let nextId = 1;

module.exports = {
  findAll: () => participantes,

  findById: (id) => participantes.find((p) => p.id === id),

  create: (dados) => {
    const participante = new Participante({ id: nextId++, ...dados });
    participantes.push(participante);
    return participante;
  },

  update: (id, dados) => {
    const index = participantes.findIndex((p) => p.id === id);
    if (index === -1) return null;
    participantes[index] = { ...participantes[index], ...dados };
    return participantes[index];
  },

  remove: (id) => {
    const index = participantes.findIndex((p) => p.id === id);
    if (index === -1) return false;
    participantes.splice(index, 1);
    return true;
  },
};
