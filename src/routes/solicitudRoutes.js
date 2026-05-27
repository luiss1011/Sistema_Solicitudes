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

module.exports = router;
