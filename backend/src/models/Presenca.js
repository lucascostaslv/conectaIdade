const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Presenca = sequelize.define('Presenca', {
  data:     { type: DataTypes.DATEONLY, allowNull: false },
  presente: { type: DataTypes.BOOLEAN,  allowNull: false },
}, {
  tableName: 'presencas',
  timestamps: false,
});

module.exports = Presenca;
