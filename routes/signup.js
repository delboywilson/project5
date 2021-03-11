const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const initializePassport = require("../passport-config");
const { pool } = require("../database");

router.get("/", (req, res) => {
  res.render("pages/signup");
});

router.post("/", async (req, res) => {
    let {
        username,
        first_name,
        last_name,
        email,
        password,
        password2,
    } = req.body;
    //empty array to push errors from form validation
    let errors = [];
    console.log({
        username,
        first_name,
        last_name,
        email,
        password,
        password2,
    });

    //first check that all fields are not empty
    if (
        !username ||
        !first_name ||
        !last_name ||
        !email ||
        !password ||
        !password2
    ) {
        errors.push({ message: "Please enter all fields" });
    }
    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters long" });
    }
    if (password !== password2) {
        errors.push({ message: "Passwords do not match" });
    }
    if (email == /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i) {
        errors.push({ message: "Please enter a valid email" });
    }
    //if any checks above pushed any errors in the array, so if any check failed
    if (errors.length > 0) {
        res.render("pages/signup", { errors });
    }
    else {
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        //check if a user exists in the database
        pool.query(
            `SELECT * FROM users
      WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    throw err;
                }
                //return the list of users that are actually in the database
                console.log(results.rows);
                if (results.rows.length > 0) {
                    errors.push({ message: "Email already registered" });
                    res.render("pages/signup", { errors });
                } else {
                    //there is no user in the database and we can register the user
                    pool.query(
                        `INSERT INTO users (username, first_name, last_name, email, password) 
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, password`,
                        [username, first_name, last_name, email, hashedPassword],
                        (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash("success_msg", "You are now registered. Please log in");
                            res.redirect("/login");
                        }
                    );
                }
            }
        );
    }
});


module.exports = router;
