if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const path = require("path");
const db = require("./database");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const app = express();
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const initializePassport = require('./passport-config')
const passport = require('passport')
const methodOverride = require('method-override');

//function to find a user based on the email
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = [
  { id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'Hello1' },
  { id: 2, name: 'Mila', email: 'mila@gmail.com', password: 'Hello1' },
  { id: 3, name: 'Milo', email: 'milo@gmail.com', password: 'Hello1' }
] //to store users whithout the database
const PORT = 3003;

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(flash());
app.use(session({
  //we are going totake it from our environment variables
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
// routes

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const homeRouter = require("./routes/home");
const detailsRouter = require("./routes/details");
const confirmRouter = require("./routes/confirm");
const errorRouter = require("./routes/error");
const logoutRouter = require("./routes/logout");
const notFoundRouter = require("./routes/notFound");

const e = require('express');

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/home", homeRouter);
app.use("/details", detailsRouter);
app.use("/confirm", confirmRouter);
app.use("/error", errorRouter);
app.use("/logout", logoutRouter);
app.use("*", notFoundRouter);


//middleware
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`);
});
