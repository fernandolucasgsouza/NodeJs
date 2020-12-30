const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'fernando',
    password: 'root',
    database: 'agenda-petshop'
})

module.exports = connection;