const express = require('express');
const app = express();
const authRoutes = require('../routes/auth');
const postRoutes = require('./routes/posts');
const cors = require('cors');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cors()); // <- habilita peticiones desde otros orígenes
app.use('/api/posts', postRoutes);


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
