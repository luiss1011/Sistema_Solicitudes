exports.getDepartmentByRole = (role) => {

  const departments = {

    gerente_rh: "RH",

    gerente_sistemas: "Sistemas",

    gerente_servicios_generales:
      "Servicios Generales",

  };

  return departments[role];

};