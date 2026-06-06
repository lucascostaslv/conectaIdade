class Progresso {
  constructor({ id, participanteId, oficinaId, nota, observacoes }) {
    this.id = id;
    this.participanteId = participanteId;
    this.oficinaId = oficinaId;
    this.nota = nota || null;           // avaliação qualitativa (pode ser númerica)
    this.observacoes = observacoes || null;
    this.registradoEm = new Date().toISOString();
  }
}

module.exports = Progresso;
