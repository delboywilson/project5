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
const PORT = process.env.PORT;

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(
  session({
    key: "user_sid",
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600000,
      sameSite: true,
    },
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
