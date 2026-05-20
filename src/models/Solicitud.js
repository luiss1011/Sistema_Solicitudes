const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Solicitud = sequelize.define("Solicitud", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  estado: {
    type: DataTypes.ENUM(
      "pendiente",
      "aprobada",
      "rechazada",
      "cancelada"
    ),
    defaultValue: "pendiente",
  },

  comentarioGerente: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Solicitud;