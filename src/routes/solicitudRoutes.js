const express = require("express");

const router = express.Router();

const solicitudController = require("../controllers/solicitudController");

const { isAuthenticated } = require("../middleware/authMiddleware");

const {
  createSolicitudValidation,
} = require("../validations/solicitudValidation");

// FORM CREAR
router.get(
  "/solicitudes/crear",

  isAuthenticated,

  solicitudController.showCreateForm,
);

router.post(
  "/solicitudes",
  isAuthenticated,

  createSolicitudValidation,

  solicitudController.createSolicitud,
);

router.get(
  "/mis-solicitudes",

  isAuthenticated,

  solicitudController.misSolicitudes,
);

router.get(
  "/panel-solicitudes",

  isAuthenticated,

  solicitudController.panelSolicitudes,
);

router.post(
  "/solicitudes/:id/aprobar",

  isAuthenticated,

  solicitudController.aprobarSolicitud,
);

router.post(
  "/solicitudes/:id/rechazar",

  isAuthenticated,

  solicitudController.rechazarSolicitud,
);

module.exports = router;
