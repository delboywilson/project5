const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash')
const initializePassport = require('../passport-config')


const users = [
  { id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'Hello1' },
  { id: 2, name: 'Mila', email: 'mila@gmail.com', password: 'Hello1' },
  { id: 3, name: 'Milo', email: 'milo@gmail.com', password: 'Hello1' }
]
router.get("/", (req, res) => {
  res.render("pages/signup");
});

router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/signup')
  }
  console.log(users)
})

module.exports = router;
