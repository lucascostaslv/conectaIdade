const Progresso = require('../models/Progresso');

let progressos = [];
let nextId = 1;

module.exports = {
  findAll: () => progressos,

  findById: (id) => progressos.find((p) => p.id === id),

  findByParticipante: (participanteId) =>
    progressos.filter((p) => p.participanteId === participanteId),

  findByOficina: (oficinaId) =>
    progressos.filter((p) => p.oficinaId === oficinaId),

  create: (dados) => {
    const progresso = new Progresso({ id: nextId++, ...dados });
    progressos.push(progresso);
    return progresso;
  },

  update: (id, dados) => {
    const index = progressos.findIndex((p) => p.id === id);
    if (index === -1) return null;
    progressos[index] = { ...progressos[index], ...dados };
    return progressos[index];
  },

  remove: (id) => {
    const index = progressos.findIndex((p) => p.id === id);
    if (index === -1) return false;
    progressos.splice(index, 1);
    return true;
  },
};
