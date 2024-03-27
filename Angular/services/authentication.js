// Adding require('dotenv').config() allows you to load environment variables from a .env file into process.env. 
// This is useful for keeping sensitive information like API keys, database credentials, and other 
// configuration variables separate from
//  your codebase.

require('dotenv').config();


const { response } = require('express');
// JSON Web Tokens (JWTs) are a standardized, self-contained method for securely transmitting
//  information between parties as a JSON object. They consist of three main parts: a header, a payload,
//   and a signature. The jsonwebtoken package in Node.js provides utilities for creating, 
// signing, and verifying JWTs.

const jwt = require('jsonwebtoken');




function authenticateToken(req, res, next)
{
    // Extract JWT token from Authorization header
    const authHeaders =  req.headers('authorization');

    // authHeader.split(' ')[1]: If authHeader is truthy (meaning it exists and is not null or undefined), 
    // this part of the expression proceeds to split the Authorization header string by spaces and extracts 
    // the second element, which is assumed to be the JWT token following the "Bearer" prefix.
    //  This is where the actual token extraction happens.

    const token = authHeader && authHeader.split(' ')[1];

    if (token == NULL)
    {
        return res.status(403);

    }

    // Verify JWT token
jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
        // Handle invalid token
        return res.status(401).json({ message: 'Invalid token' });
    } else {
    
         res.locals = response;
         console.log(response);
         next();
    }
});

}

module.exports = {authenticateToken: authenticateToken}