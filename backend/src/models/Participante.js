const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Participante = sequelize.define('Participante', {
  nome:           { type: DataTypes.STRING,  allowNull: false },
  telefone:       { type: DataTypes.STRING },
  email:          { type: DataTypes.STRING },
  dataNascimento: { type: DataTypes.DATEONLY, allowNull: false },
  observacoes:    { type: DataTypes.TEXT },
}, {
  tableName: 'participantes',
});

module.exports = Participante;
