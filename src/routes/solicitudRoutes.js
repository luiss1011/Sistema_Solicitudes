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

module.exports = router;
