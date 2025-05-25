// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const dotenv = require('dotenv');
const randtoken = require('rand-token');
const { findUserByEmailOrUsername } = require('../utils/authUtils');
const { sendEmail } = require('../utils/emailService');

dotenv.config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Datos recibidos desde el cliente: ', req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // Enviar correo de bienvenida
    await sendEmail({
      to: email,
      subject: '¡Bienvenido a Forceo!',
      html: `
        <h1>¡Bienvenido a Forceo, ${username}!</h1>
        <p>Gracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.</p>
        <p>Ya puedes comenzar a explorar todas las funcionalidades que tenemos para ti.</p>
        <br>
        <p>Saludos,</p>
        <p>El equipo de Forceo</p>
      `
    }).catch(error => {
      // Log el error pero no afecta el registro del usuario
      console.error('Error al enviar el correo de bienvenida:', error);
    });

    return res.status(201).json({ user: newUser });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Usuario o email ya existe' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  console.log(`Haciendo loggin`);
  try {
    const user = await findUserByEmailOrUsername(emailOrUsername);

    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(`Generando token ${JSON.stringify(token)}`);
    // console.log(new Date(token.exp));
    /* const refreshToken = randtoken.uid(256); //genera el token aleatorio
    await saveRefreshToken(user.id, refreshToken); */

    res.cookie('token', token, {
      httpOnly: true, //  No accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo por HTTPS en producción
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax', // Bloquea CSRF desde otros sitios
      maxAge: 3600000, // 1 hora
    });

    return res.json({ mensaje: 'Login exitoso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const logoutUser = (req, res) => {
  console.log('Cookie recibida', req.cookies.token);
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
  });
  console.log('Cookie eliminada');
  res.json({ mensaje: 'Sesión cerrada correctamente' });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, email: true },
    });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const verifyCaptcha = async (req, res, next) => {
  const token = req.body.captchaToken;
  if (!token) {
    return res.status(400).json({ message: 'Captcha token faltante' });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

  const response = await fetch(verifyUrl, { method: 'POST' });
  const { success, score } = await response.json();

  if (!success || score < 0.5) {
    console.log(res);
    return res.status(403).json({ message: 'Captcha inválido' });
  }

  next();
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getAllUsers,
  verifyCaptcha,
};
