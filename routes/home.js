const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const initializePassport = require("../passport-config");

router.get("/", (req, res) => {
    res.render("pages/home", {
        isAuthenticated: req.user != undefined
    });
});

module.exports = router;
