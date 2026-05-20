const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login", {
    titulo: "Iniciar sesión",
    error: null,
  });
});

module.exports = router;
