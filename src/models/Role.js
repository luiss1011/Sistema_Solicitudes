const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(50), // más preciso que STRING genérico (VARCHAR 255)
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true, // rechaza strings vacíos ""
        len: [2, 50], // mínimo 2 caracteres, máximo 50
      },
    },
  },

  {
    tableName: "roles", // nombre explícito — sin depender de la convención
    timestamps: true, // createdAt y updatedAt (ya viene por defecto, pero es bueno hacerlo visible)
  },
);

module.exports = Role;
