// This code establishes a connection to a MySQL database using the mysql package in Node.js. 
// const mysql = require('mysql');: This imports the mysql package, which provides functionality to interact with MySQL databases in Node.js.
const mysql = require('mysql');


// require('dotenv').config();: This imports the dotenv package and loads environment variables from a .env file into process.env. This is useful for storing sensitive information like database credentials.
require('dotenv').config();

// const connection = mysql.createConnection({ ... });: This creates a new MySQL connection using the mysql.createConnection() method. It takes an object as an argument with connection configuration properties:
const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
// This method establishes a connection to the MySQL database. It takes a callback function as an argument, which is executed once the connection is established or if an error occurs during the connection process. If there's no error (!err), it logs "Connected" to the console. Otherwise, it logs the error.
connection.connect((err) => {
if (!err){
    console.log("Connected ") ;
}
else{
    console.log(err) ;
}
}

);
// module.exports = connection;: This exports the connection object, making it available for other modules to use. This allows other parts of the application to reuse the same database connection.

module.exports = connection;



