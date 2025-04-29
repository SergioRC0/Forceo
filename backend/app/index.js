const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const app = express();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const authRoutes = require('../routes/auth');
const postRoutes = require('../routes/posts');
const usuariosRouter = require('../routes/users');
const cors = require('cors');

app.use(cors({// <- habilita peticiones desde otros orígenes
  origin:'http://localhost:3000',
  credentials:true,
}))

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', usuariosRouter);

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});










