//require environmental variables
require("dotenv").config();

const pgp = require("pg-promise")();
const { pguser, pgpassword, pgport } = require("./config");

//require pg module
const { Pool } = require('pg');

//in dev isProduction will be set to false
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgres://${pguser}:${pgpassword}@localhost:${pgport}/project5`; // added a : between ${pguser}:${pgpassword}

const db = pgp(connectionString);

//if the app is in production process.env.DATABASE_URL, otherwise use connection
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction
});

module.exports = { pool };
