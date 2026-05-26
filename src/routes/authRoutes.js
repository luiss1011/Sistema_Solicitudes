const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// LOGIN VISTA
router.get("/login", authController.showLogin);

// LOGIN POST
router.post("/login", authController.login);

// LOGOUT
router.post("/logout", authController.logout);

module.exports = router;
