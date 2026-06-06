class Presenca {
  constructor({ id, participanteId, oficinaId, data, presente }) {
    this.id = id;
    this.participanteId = participanteId;
    this.oficinaId = oficinaId;
    this.data = data;         //Formato "YYYY-MM-DD"
    this.presente = presente; // booleano
  }
}

module.exports = Presenca;
