const Solicitud = require("../models/Solicitud");
const { validationResult } = require("express-validator");
const { ROLE_DEPARTAMENTO } = require("../config/constants");
const { getDepartmentByRole } = require("../helpers/departmentHelper");

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

exports.panelSolicitudes = async (req, res) => {
  try {
    const role = req.session.user.role;
    const departamento = ROLE_DEPARTAMENTO[role];

    // Si el rol no tiene departamento asignado, acceso denegado
    if (!departamento) {
      return res.status(403).render("errors/403", {
        user: req.session.user,
      });
    }

    const solicitudes = await Solicitud.findAll({
      where: { departamento },
      order: [["createdAt", "DESC"]],
    });

    res.render("solicitudes/panel", {
      user: req.session.user,
      solicitudes,
      currentPage: "panelSolicitudes",
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("errors/500", { user: req.session.user });
  }
};

exports.aprobarSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByPk(req.params.id);

    if (solicitud.estado !== "pendiente") {
      return res.send("La solicitud ya fue procesada");
    }

    if (!solicitud) {
      return res.send("Solicitud no encontrada");
    }

    // OBTENER DEPARTAMENTO GERENTE
    const departamentoGerente = getDepartmentByRole(req.session.user.role);

    // VALIDAR PERMISO
    if (solicitud.departamento !== departamentoGerente) {
      return res.send("No autorizado");
    }

    solicitud.estado = "aprobada";

    await solicitud.save();

    res.redirect("/panel-solicitudes");
  } catch (error) {
    console.error(error);

    res.send("Error al aprobar solicitud");
  }
};

exports.rechazarSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findByPk(req.params.id);

    if (solicitud.estado !== "pendiente") {
      return res.send("La solicitud ya fue procesada");
    }

    if (!solicitud) {
      return res.send("Solicitud no encontrada");
    }

    // OBTENER DEPARTAMENTO GERENTE
    const departamentoGerente = getDepartmentByRole(req.session.user.role);

    // VALIDAR PERMISO
    if (solicitud.departamento !== departamentoGerente) {
      return res.send("No autorizado");
    }

    solicitud.estado = "rechazada";

    await solicitud.save();

    res.redirect("/panel-solicitudes");
  } catch (error) {
    console.error(error);

    res.send("Error al aprobar solicitud");
  }
};
