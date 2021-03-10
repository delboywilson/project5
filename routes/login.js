const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const initializePassport = require("../passport-config");
const db = require("../database");

router.get("/", (req, res) => {
  res.render("pages/login");
});

// post route for login form
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
