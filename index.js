require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const { sequelize } = require('./models');
const path = require('path');

const app = express();

app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tasks', taskRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});

