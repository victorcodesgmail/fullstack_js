
// const express = require('express');: Imports the Express.js framework, allowing you to create an Express application.
const express = require('express');
// var cors = require('cors');: Imports the CORS middleware, which enables Cross-Origin Resource Sharing. This allows your server to accept requests from other domains.
var cors =require('cors');
// const connection = require('./connection');: Imports the connection module from the local file connection.js. This likely establishes a connection to a MySQL database.
const  connection = require('./connection');
// const userRoute = require('./routes/user');: Imports the userRoute module from the local file user.js. This likely contains route handlers for user-related endpoints.
const userRoute = require('./routes/user');

const { createConnection } = require('mysql');
// const app = express();: Creates an instance of the Express application, which you'll use to define routes and middleware.
const app = express();
// app.use(cors());: Uses the CORS middleware to enable Cross-Origin Resource Sharing. This allows your server to accept requests from other origins.
app.use(cors());
// app.use(express.urlencoded({extended: true}));: Parses incoming request bodies with URL-encoded data. This middleware is used to parse form data sent in POST requests.
app.use(express.urlencoded({extended: true}));
// app.use('/user', userRoute);: Mounts the userRoute middleware at the /user URL path. This means that any requests to /user will be handled by the userRoute router.
app.use(express.json());
app.use('/user', userRoute);


module.exports = app;



//