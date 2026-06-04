class Oficina {
  constructor({ id, titulo, descricao, educador, dataInicio, dataFim, cargaHoraria }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao || null;
    this.educador = educador;
    this.dataInicio = dataInicio; // ISO string: "YYYY-MM-DD"
    this.dataFim = dataFim;       // ISO string: "YYYY-MM-DD"
    this.cargaHoraria = cargaHoraria; // em horas
    this.criadoEm = new Date().toISOString();
  }
}

module.exports = Oficina;
