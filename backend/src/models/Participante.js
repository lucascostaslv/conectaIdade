class Participante {
  constructor({ id, nome, telefone, email, dataNascimento, observacoes }) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.dataNascimento = dataNascimento; // ISO string: "YYYY-MM-DD"
    this.observacoes = observacoes || null;
    this.criadoEm = new Date().toISOString();
  }
}

module.exports = Participante;
