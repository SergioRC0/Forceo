const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth');
const passport = require('../utils/googleStrategy');
const session = require('express-session');

const app = express();
app.use(express.json()); //MIDDLEWARE TO PARSE JSON 
app.use(cookieParser());

app.use(cors({// <- habilita peticiones desde otros orígenes
  origin: process.env.CLIENT_ORIGIN,
  credentials:true,
}))


app.use('/api/auth', authRoutes);

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true solo en producción con HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;







