const Solicitud = require("../models/Solicitud");
const { validationResult } = require("express-validator");

// MOSTRAR FORMULARIO
exports.showCreateForm = (req, res) => {
  res.render("solicitudes/crear", {
    user: req.session.user,

    currentPage: "crearSolicitud",

    errors: [],

    old: {},
  });
};

exports.createSolicitud = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, departamento } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("solicitudes/crear", {
        user: req.session.user,

        currentPage: "crearSolicitud",

        errors: errors.array(),

        old: req.body,
      });
    }

    await Solicitud.create({
      titulo,
      descripcion,
      categoria,
      departamento,
      usuarioId: req.session.user.id,
    });
    res.redirect("/mis-solicitudes");
  } catch (error) {
    console.error(error);
    res.send("Error al crear solicitud");
  }
};

exports.misSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.findAll({
      where: {
        usuarioId: req.session.user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("solicitudes/index", {
      user: req.session.user,
      solicitudes,
      currentPage: "misSolicitudes",
    });
  } catch (error) {
    console.error(error);
    res.send("Error al obtener solicitudes");
  }
};
