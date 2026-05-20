const express = require("express");
const path = require("path");

const { sessionConfig } = require("./config/session");

// 1. Seguridad básica — instala con: npm install helmet
const helmet = require("helmet");

// 2. Logs de peticiones — instala con: npm install morgan
const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/authRoutes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Seguridad: agrega headers HTTP de protección
app.use(helmet());

// Logs: muestra en consola cada petición (muy útil en desarrollo)
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(sessionConfig);

app.use(authRoutes);

module.exports = app;
