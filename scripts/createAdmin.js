require("dotenv");

const bcrypt = require("bcrypt");

const sequelize = require("../src/config/database");

const Role = require("../src/models/Role");
const User = require("../src/models/User");

require("../src/models");

async function createAdmin() {
  try {
    await sequelize.sync();

    // BUSCAR ROL ADMIN
    let adminRole = await Role.findOne({
      where: {
        nombre: "admin",
      },
    });

    // CREAR ROL SI NO EXISTE
    if (!adminRole) {
      adminRole = await Role.create({
        nombre: "admin",
      });
    }

    // VERFICAR SI ADMIN YA EXISTE
    const existingAdmin = await User.findOne({
      where: {
        correo: process.env.ADMIN_EMAIL,
      },
    });

    if (existingAdmin) {
      console.log("El admin ya existe");
      process.exit();
    }

    // ENCRIPTAR PASSWORD
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // CREAR ADMIN
    await User.create({
      numeroEmpleado: "0001",
      nombre: "Administrador",
      correo: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      departamento: "Administración",
      puesto: "Administrador General",
      releId: adminRole.id,
    });

    console.log("Admin creado correctamente");

    process.exit();
  } catch (error) {
    console.error(error);
  }
}

createAdmin();
