const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const initializePassport = require("../passport-config");
const { checkNotAuthenticated } = require("../middleware");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [
  {
    id: 1,
    name: "Alex",
    email: "alex@gmail.com",
    password: "$2b$10$MKuAv.R8GdJbZHMAOeh4fuSvHLbv86PWrANegLoEeT92sHVKlFhGy",
  },
  { id: 2, name: "Mila", email: "mila@gmail.com", password: "Hello1" },
  { id: 3, name: "Milo", email: "milo@gmail.com", password: "Hello1" },
];

router.get("/", (req, res) => {
  res.render("pages/login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
