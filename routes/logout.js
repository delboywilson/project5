const express = require("express");
const router = express.Router();
const passport = require("passport");
const methodOverride = require("method-override");
const app = express();

app.use(methodOverride("_method"));

router.delete("/", (req, res) => {
  console.log(req.isAuthenticated());
  req.logout();
  console.log(req.isAuthenticated());
  req.flash("success", "Logged out. See you soon!");
  res.redirect("/login");
});

module.exports = router;

// app.get('/logout', function(req, res){
//   console.log(req.isAuthenticated());
//   req.logout();
//   console.log(req.isAuthenticated());
//   req.flash('success', "Logged out. See you soon!");
//   res.redirect('/');
//   });
