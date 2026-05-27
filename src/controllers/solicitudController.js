const Solicitud = require("../models/Solicitud");

// MOSTRAR FORMULARIO
exports.showCreateForm = (req, res) => {
  res.render("solicitudes/crear", {
    user: req.session.user,
    currentPage: "crearSolicitud",
  });
};

exports.createSolicitud = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, departamento } = req.body;

    // Validar antes de tocar la BD
    if (!titulo || !descripcion || !categoria || !departamento) {
      return res.render("solicitudes/crear", {
        user: req.session.user,
        currentPage: "crearSolicitud",
        error: "Todos los campos son obligatorios",
      });
    }

    await Solicitud.create({
      titulo: titulo.trim(), // elimina espacios al inicio y final
      descripcion: descripcion.trim(),
      categoria: categoria.trim(),
      departamento,
      usuarioId: req.session.user.id,
    });

    res.redirect("/mis-solicitudes");
  } catch (error) {
    console.error(error);
    res.render("solicitudes/crear", {
      user: req.session.user,
      currentPage: "crearSolicitud",
      error: "Error al crear la solicitud, intenta de nuevo",
    });
  }
};

exports.misSolicitudes = async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina) || 1; // ?pagina=2
    const limite = 10;
    const offset = (pagina - 1) * limite;

    const { count, rows: solicitudes } = await Solicitud.findAndCountAll({
      where: { usuarioId: req.session.user.id },
      order: [["createdAt", "DESC"]],
      limit: limite,
      offset: offset,
    });

    const totalPaginas = Math.ceil(count / limite);

    res.render("solicitudes/index", {
      user: req.session.user,
      solicitudes,
      currentPage: "misSolicitudes",
      pagina,
      totalPaginas,
    });
  } catch (error) {
    console.error(error);
    res.send("Error al obtener solicitudes");
  }
};
