const Presenca = require('../models/Presenca');

let presencas = [];
let nextId = 1;

module.exports = {
  findAll: () => presencas,

  findByOficina: (oficinaId) => presencas.filter((p) => p.oficinaId === oficinaId),

  findByParticipante: (participanteId) =>
    presencas.filter((p) => p.participanteId === participanteId),

  create: (dados) => {
    const presenca = new Presenca({ id: nextId++, ...dados });
    presencas.push(presenca);
    return presenca;
  },

  remove: (id) => {
    const index = presencas.findIndex((p) => p.id === id);
    if (index === -1) return false;
    presencas.splice(index, 1);
    return true;
  },
};
