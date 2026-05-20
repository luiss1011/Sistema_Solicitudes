const Role = require("./Role");
const User = require("./User");
const Solicitud = require("./Solicitud");

// RELACIÓN ROLE → USERS
Role.hasMany(User, {
  foreignKey: "roleId",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
});

// RELACIÓN USER → SOLICITUDES
User.hasMany(Solicitud, {
  foreignKey: "usuarioId",
});

Solicitud.belongsTo(User, {
  foreignKey: "usuarioId",
});

module.exports = {
  Role,
  User,
  Solicitud,
};
