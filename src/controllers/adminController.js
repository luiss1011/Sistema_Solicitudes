const User = require("../models/User");

const bcrypt = require("bcrypt");

const Role = require("../models/Role");

// LISTAR USUARIOS
exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.render("admin/users/index", {
      user: req.session.user,

      users,

      currentPage: "adminUsers",
    });
  } catch (error) {
    console.error(error);

    res.send("Error obteniendo usuarios");
  }
};

// FORM CREAR USUARIO
exports.showCreateUserForm = async (req, res) => {
  try {
    const roles = await Role.findAll();

    res.render("admin/users/create", {
      user: req.session.user,

      currentPage: "adminUsers",

      roles,
    });
  } catch (error) {
    console.error(error);

    res.send("Error obteniendo roles");
  }
};

// CREAR USUARIO
exports.createUser = async (req, res) => {
  try {
    const {
      nombre,
      correo,
      password,
      roleId,
      numeroEmpleado,
      departamento,
      puesto,
    } = req.body;

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      nombre,

      correo,

      password: hashedPassword,

      roleId,

      numeroEmpleado,

      departamento,

      puesto,
    });

    res.redirect("/admin/usuarios");
  } catch (error) {
    console.error(error);

    res.send("Error creando usuario");
  }
};
