const Participante = require('./Participante');
const Oficina      = require('./Oficina');
const Presenca     = require('./Presenca');
const Progresso    = require('./Progresso');

Presenca.belongsTo(Participante, { foreignKey: 'participanteId', onDelete: 'CASCADE' });
Presenca.belongsTo(Oficina,      { foreignKey: 'oficinaId',      onDelete: 'CASCADE' });

Progresso.belongsTo(Participante, { foreignKey: 'participanteId', onDelete: 'CASCADE' });
Progresso.belongsTo(Oficina,      { foreignKey: 'oficinaId',      onDelete: 'CASCADE' });

module.exports = { Participante, Oficina, Presenca, Progresso };
