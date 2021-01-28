const util = require("util");
const mysql = require("mysql")


    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rootroot",
        database: "employees_db"
    })
    
    connection.connect();
    
    connection.query = util.promisify(connection.query, console.log("connected"));

    module.exports = connection;