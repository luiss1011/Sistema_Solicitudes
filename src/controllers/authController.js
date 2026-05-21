const bcrypt = require("bcrypt");

const User = require("../models/User");
const Role = require("../models/Role");

exports.showLogin = (req, res) => {
  res.rener("auth/login");
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // BUSCAR USUARIO
    const user = await User.findOne({
      where: { correo },

      include: Role,
    });

    // VALIDAR USUARIO
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.send("Contraseña incorrecta");
    }

    // GUARDAR SESIÓN
    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      role: user.Role.nombre,
    };

    // REDIRECCIÓN
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);

    res.send("Error en login");
  }
};
