const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend')));

//Rotas
const participantesRouter = require('./routes/participantes');
const oficinasRouter = require('./routes/oficinas');
const presencasRouter = require('./routes/presencas');
const progressosRouter = require('./routes/progressos');

app.use('/api/participantes', participantesRouter);
app.use('/api/oficinas', oficinasRouter);
app.use('/api/presencas', presencasRouter);
app.use('/api/progressos', progressosRouter);

module.exports = app;
