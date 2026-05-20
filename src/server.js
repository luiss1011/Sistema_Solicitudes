require("dotenv").config();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = require("./app");
const sequelize = require("./config/database");
const { sessionStore } = require("./config/session");

require("./models");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync({ alter: true });

    await sessionStore.sync();

    console.log("Base de datos conectada");

    app.listen(PORT, () => {
      console.log(`Servidor conectado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar la BD:", error);
  }
}

startServer();
