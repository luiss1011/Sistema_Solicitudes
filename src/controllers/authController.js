const bcrypt = require("bcrypt");

const User = require("../models/User");
const Role = require("../models/Role");

require("../models");

exports.showLogin = (req, res) => {
  res.render("auth/login");
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // VALIDAR QUE VENGAN LOS DATOS
    if (!correo || !password) {
      return res.render("auth/login", { error: "Completa todos los campos" });
    }

    // BUSCAR USUARIO
    const user = await User.findOne({
      where: { correo },
      include: Role,
    });

    // MISMO MENSAJE para usuario no encontrado Y contraseña incorrecta
    // Nunca le digas al atacante cuál de los dos falló
    const validPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !validPassword) {
      return res.render("auth/login", { error: "Credenciales incorrectas" });
    }

    // VERIFICAR QUE EL USUARIO ESTÉ ACTIVO
    if (!user.activo) {
      return res.render("auth/login", {
        error: "Usuario inactivo, contacta al administrador",
      });
    }

    // GUARDAR SESIÓN
    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      role: user.Role.nombre,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.render("auth/login", { error: "Error del servidor, intenta de nuevo" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    res.redirect("/login");
  });
};
