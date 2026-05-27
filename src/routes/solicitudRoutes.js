const express = require("express");

const router = express.Router();

const solicitudController = require("../controllers/solicitudController");

const { isAuthenticated } = require("../middleware/authMiddleware");

// FORM CREAR
router.get(
  "/solicitudes/crear",

  isAuthenticated,

  solicitudController.showCreateForm,
);

router.post(
  "/solicitudes",
  isAuthenticated,

  solicitudController.createSolicitud,
);

router.get(
  "/mis-solicitudes",

  isAuthenticated,

  solicitudController.misSolicitudes,
);

module.exports = router;
