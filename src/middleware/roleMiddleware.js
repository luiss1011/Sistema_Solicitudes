exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        const userRole = req.session.user.role;

        if (!roles.includes(userRole)) {
            return res.send("Acceso denegado");
        }

        next();
    };
};