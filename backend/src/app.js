const express = require('express');
const app = express();

app.use(express.json());

// Rotas
const participantesRouter = require('./routes/participantes');
const oficinasRouter = require('./routes/oficinas');
const presencasRouter = require('./routes/presencas');

app.use('/api/participantes', participantesRouter);
app.use('/api/oficinas', oficinasRouter);
app.use('/api/presencas', presencasRouter);

module.exports = app;
