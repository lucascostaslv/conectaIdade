const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

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
