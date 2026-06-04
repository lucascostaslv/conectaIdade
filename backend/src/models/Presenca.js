class Presenca {
  constructor({ id, participanteId, oficinaId, data, presente }) {
    this.id = id;
    this.participanteId = participanteId;
    this.oficinaId = oficinaId;
    this.data = data;         // ISO string: "YYYY-MM-DD"
    this.presente = presente; // boolean
  }
}

module.exports = Presenca;
