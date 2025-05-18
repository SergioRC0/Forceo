const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth');
const postRouter = require('../routes/posts');
const postsPublicRoutes = require('../routes/postsPublic');
const { authenticateToken } = require('../middleware/authMiddleware');
const passport = require('passport');
require('../utils/googleStrategy');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    // habilita peticiones desde otros orígenes
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/postsPublic', postsPublicRoutes);
//ruta protegidas
app.use('/api/posts', authenticateToken, postRouter);

module.exports = app;
