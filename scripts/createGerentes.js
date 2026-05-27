require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("../src/config/database");
const Role = require("../src/models/Role");
const User = require("../src/models/User");
require("../src/models");

const GERENTES = [
  {
    rol: "gerente_rh",
    numeroEmpleado: "0002",
    nombre: "Gerente RH",
    correo: "gerente.rh@empresa.com",
    departamento: "RH",
    puesto: "Gerente RH",
  },
  {
    rol: "gerente_sistemas",
    numeroEmpleado: "0003",
    nombre: "Gerente Sistemas",
    correo: "gerente.sistemas@empresa.com",
    departamento: "Sistemas",
    puesto: "Gerente Sistemas",
  },
  {
    rol: "gerente_servicios_generales",
    numeroEmpleado: "0004",
    nombre: "Gerente Servicios Generales",
    correo: "gerente.sg@empresa.com",
    departamento: "Servicios Generales",
    puesto: "Gerente Servicios Generales",
  },
];

async function crearGerentes() {
  try {
    await sequelize.sync();

    for (const gerente of GERENTES) {

      // BUSCAR O CREAR ROL
      const [role] = await Role.findOrCreate({
        where: { nombre: gerente.rol },
      });

      // VERIFICAR SI YA EXISTE
      const existente = await User.findOne({
        where: { correo: gerente.correo },
      });

      if (existente) {
        console.log(`${gerente.nombre} ya existe, omitiendo...`);
        continue; // salta al siguiente sin detener el loop
      }

      // ENCRIPTAR Y CREAR
      const hashedPassword = await bcrypt.hash("123456", 10);

      await User.create({
        numeroEmpleado: gerente.numeroEmpleado,
        nombre: gerente.nombre,
        correo: gerente.correo,
        password: hashedPassword,
        departamento: gerente.departamento,
        puesto: gerente.puesto,
        roleId: role.id,
      });

      console.log(`${gerente.nombre} creado correctamente`);
    }

    await sequelize.close();
    process.exit(0);

  } catch (error) {
    console.error(error);
    await sequelize.close();
    process.exit(1);
  }
}

crearGerentes();