const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Oficina = sequelize.define('Oficina', {
  titulo:       { type: DataTypes.STRING,  allowNull: false },
  descricao:    { type: DataTypes.TEXT },
  educador:     { type: DataTypes.STRING,  allowNull: false },
  dataInicio:   { type: DataTypes.DATEONLY, allowNull: false },
  dataFim:      { type: DataTypes.DATEONLY },
  cargaHoraria: { type: DataTypes.FLOAT,   allowNull: false },
}, {
  tableName: 'oficinas',
});

module.exports = Oficina;
