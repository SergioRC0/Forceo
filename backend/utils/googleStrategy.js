const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');

// Configura la estrategia de autenticación con Google usando Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    // Función que se ejecuta cuando Google responde con los datos del usuario
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({ where: { email: profile.emails[0].value } });
        if (!user) {
          // Si no existe, crea un nuevo usuario con los datos de Google
          user = await prisma.user.create({
            data: {
              username: profile.displayName.replace(/\s/g, '') + Math.floor(Math.random() * 10000),
              email: profile.emails[0].value,
              password_hash: '', // No hay password
            },
          });
        }
        // Finaliza el proceso de autenticación pasando el usuario encontrado o creado
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

<<<<<<< HEAD
module.exports = passport;
=======
module.exports = passport;
>>>>>>> 576c82430619c40f6667af0f04d35c48280fc170
