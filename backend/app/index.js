const express = require('express');
const app = express();
const authRoutes = require('../routes/auth');

app.use(express.json());
app.use('/api/auth', authRoutes);

const cors = require('cors');
app.use(cors()); // <- habilita peticiones desde otros orígenes

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
