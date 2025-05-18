// src/utils/authUtils.js
const prisma = require('../lib/prisma');

const findUserByEmailOrUsername = async (emailOrUsername) => {
  if (emailOrUsername.includes('@')) {
    return await prisma.user.findUnique({ where: { email: emailOrUsername } });
  } else {
    return await prisma.user.findUnique({ where: { username: emailOrUsername } });
  }
};

module.exports = { findUserByEmailOrUsername };
