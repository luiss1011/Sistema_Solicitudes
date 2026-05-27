const { body } = require("express-validator");

exports.createSolicitudValidation = [
  body("titulo")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 5 })
    .withMessage("El título debe tener mínimo 5 caracteres"),

  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener mínimo 10 caracteres"),

  body("categoria")
    .trim()
    .notEmpty()
    .withMessage("La categoría es obligatoria"),

  body("departamento").notEmpty().withMessage("Selecciona un departamento"),
];
