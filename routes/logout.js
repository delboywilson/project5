const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/logout");
});

router.delete('/logout', (req, res) => {
  res.logout()
  req.redirect('/login')
})
module.exports = router;
