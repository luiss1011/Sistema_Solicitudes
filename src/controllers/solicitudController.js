const Solicitud = require("../models/Solicitud");

// MOSTRAR FORMULARIO
exports.showCreateForm = (req, res) => {
  res.render("solicitudes/crear", {
    user: req.session.user,
    currentPage: "crearSolicitud",
  });
};
