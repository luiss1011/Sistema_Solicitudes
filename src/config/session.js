const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./database");

const sessionStore = new SequelizeStore({
  db: sequelize,
});

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,

  store: sessionStore,

  resave: false,
  saveUninitialized: false,

  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, // JS del navegador no puede leer la cookie — previene XSS
    secure: process.env.NODE_ENV === "production", // solo HTTPS en producción
    sameSite: "strict", // previene CSRF
  },
});

module.exports = {
  sessionConfig,
  sessionStore,
};
