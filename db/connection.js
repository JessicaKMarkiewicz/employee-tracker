const mysql = require('mysql2');

// Connection to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'password',
    database: 'employees'
    },
    console.log("You are now connected to the employees database")
);

module.exports = db;