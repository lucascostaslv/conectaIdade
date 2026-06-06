class Oficina {
  constructor({ id, titulo, descricao, educador, dataInicio, dataFim, cargaHoraria }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao || null;
    this.educador = educador;
    this.dataInicio = dataInicio; //Formato "YYYY-MM-DD"
    this.dataFim = dataFim;       //Formato "YYYY-MM-DD"
    this.cargaHoraria = cargaHoraria; // em horas
    this.criadoEm = new Date().toISOString();
  }
}

// SEQUELIZE

module.exports = Oficina;
