require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const { sequelize } = require('./models');
const path = require('path');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tasks', taskRoutes);

app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
});

