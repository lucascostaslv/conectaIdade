const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Progresso = sequelize.define('Progresso', {
  nota:        { type: DataTypes.STRING },
  observacoes: { type: DataTypes.TEXT },
}, {
  tableName: 'progressos',
});

module.exports = Progresso;
