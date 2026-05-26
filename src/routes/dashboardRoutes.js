const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  isAuthenticated,
  authorizeRoles("admin"),
  (req, res) => {
    res.render("dashboard/index", {
      user: req.session.user,
    });
  },
);

module.exports = router;
