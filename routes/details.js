const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const initializePassport = require("../passport-config");

router.get("/:movieId", (req, res) => {
  console.log(req.user);
    res.render("pages/details", {
        isAuthenticated: req.user != undefined
    });
});

module.exports = router;
