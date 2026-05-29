exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {

    console.log("Roles permitidos:", roles);

    console.log(
      "Rol usuario:",
      req.session.user.role
    );

    if (!req.session.user) {
      return res.redirect("/login");
    }

    const userRole = req.session.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).render("errors/403");
    }

    next();
  };
};