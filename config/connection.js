const mysql = require('mysql2');
require('dotenv').config();

//create connection to our database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});


module.exports = db;