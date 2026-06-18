require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/database/connection');
require('./src/models'); // registra models e associações antes do sync

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Falha ao conectar ao banco de dados:', err);
  process.exit(1);
});
