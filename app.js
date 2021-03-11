if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { pool } = require('./database')
const express = require("express");
const path = require("path");
const db = require("./database");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const app = express();
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const initializePassport = require("./passport-config");
const passport = require("passport");
const methodOverride = require("method-override");
const expressValidator = require('express-validator');

//function to find a user based on the email
initializePassport(passport);

//to store users whithout the database
const PORT = process.env.PORT || 3003;

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(flash());

// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(methodOverride("_method"));

app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false,
  })
);

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
const { secret } = require("./config");

//what is it?
const e = require("express");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/home", homeRouter);
app.use("/details", detailsRouter);
app.use("/confirm", confirmRouter);
app.use("/error", errorRouter);
app.use("/logout", logoutRouter);
app.use("*", notFoundRouter);

app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`);
});
