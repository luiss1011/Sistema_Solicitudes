const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const { isAuthenticated } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

// PANEL USUARIOS
router.get(
  "/admin/usuarios",

  isAuthenticated,

  authorizeRoles("admin"),

  adminController.listUsers,
);

// FORM CREAR USUARIO
router.get(
  "/admin/usuarios/crear",
  isAuthenticated,

  authorizeRoles("admin"),

  adminController.showCreateUserForm,
);

// CREAR USUARIO
router.post(
  "/admin/usuarios",

  isAuthenticated,

  authorizeRoles("admin"),

  adminController.createUser,
);

module.exports = router;
