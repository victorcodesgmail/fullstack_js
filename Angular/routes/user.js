


// defining a router using Express. This router will handle various routes and HTTP methods defined within it.


// This imports the Express framework, allowing you to create an instance of an Express application and define routes and middleware.
const express = require('express');
//
// This imports a module named connection, which presumably establishes a connection to your database. This connection can be used within your routes to interact with your database.
const  connection = require('../connection');

// This creates a new router object using Express's Router class. You'll define your routes and route handlers on this router object.
const router = express.Router();
 const jwt = require('jsonwebtoken');
 const nodemailer = require('nodemailer');
 require('dotenv').config();
 // Handle POST request to create a new user
//  router.post('/signup', (req, res) => {...}): This defines a route handler for POST requests to the '/signup' endpoint. When a POST request is made to this endpoint, this handler function will be executed.

var auth = require('../services/authentication');

var checkrole = require('../services/checkrole');

router.post('/signup',(req, res)=> {
    // let user = req.body;: This extracts the request body from the incoming POST request. It assumes that the request body contains JSON data representing the user information.
let user = req.body;
// query = "select email, password, role, status from user where email =?";: This SQL query selects the email, password, role, and status columns from the user table in the database where the email matches the email provided in the request body.
query = "select email ,password, role,status from user where email =?"

// connection.query(query, [user.email], (err, results) => {...}): This executes the SQL query against the database using the connection established earlier. It passes the email extracted from the request body as a parameter to the query. The callback function handles the query results or errors.
connection.query(query, [user.email ],(err, results)=>{
if(!err){
    if (results.length <= 0 )
    //
    {
        query =  "INSERT INTO user (name, contactNumber, email, password, status, role) VALUES(?,?,?,?,'false','user')";
        connection.query(query, [user.name,user.contactNumber, user.email, user.password],(err, results)=>{

            if (!err)
            {
                    return res.status(200).json({message: "User successfully registered"})
            }
            else
            {
                return res.status(500).json(err);
            }
        })
        
    }
    else{
        return res.status(400).json({message: "Email alread exist"})
    }
}
else
{
    return res.status(500).json(err);
}})

});

//


router.post('/login', (req,res)=>
{
    const user = req.body;
    query = "select email ,password, role,status from user where email =?"
    connection.query(query, [user.email ],(err, results)=>{

        if(!err){
            if (results.length <= 0 || results[0].password != user.password)
            {

                return res.status(401).json({message: "Incorrect username or password"});
                    
                 
                
            }
            else if (results[0].status == 'false')
            
            {
                return res.status(401).json({message: "Wait for admin approval "})
            }

            else if (results[0].password == user.password)
            {
                const response = {email : results[0].email, role: results[0].role, }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn:'8h'})
                res.status(200).json({token:accessToken});
            }
            
            else{
                return res.status(400).json({message: "Something went wrong. Please tr"})
            }
        }
        else
        {
            return res.status(500).json(err);
        }
         
    });
}
);
//..

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        password:process.env.PASSWORD
    }
});



router.post('/forgotPassword',(req, res)=>{

    const user  = req.body;

    query = "select email ,password from user where email =?"


    connection.query(query, [user.email ],(err, results)=>{
        if(!err){

            //user not in database

            if (results.length <= 0 )
            {
   console.log("hello");
                return res.status(200).json({message: "password sent to email"});
                    
             
                
            }
            else{
                var mailOptions = {
                    from:process.env.EMAIL,
                    to: results[0].email,
                    subject:'password   from afe management servers',
                    html:'<p><b>your login details for  cafe management system</b><br/><b>Email: </b> '+results[0].email+' <br><b>Password: </b>'+results[0].password+'<br><a href = "http://localhost: 4200">Click to login</a></p>'
                };
                transporter.sendMail(mailOptions,function(error,info){
                    if (error){
                        console.log(error);
                    }
                    else{
         
                        console.log('Email sent '+info.response);
                    }
                });
            }
        }
        else{
            return res.status(500).json(err); 
        }
    })
})
module.exports=router;

//2658




router.get('/get',auth.authenticateToken,(req, res)=>{
    var query = "select id ,name , email ,password from user where role == 'user'"
    connection.query(query,(req,res) =>{
            if (!err)
            {
                return res.status(200).json(results); 
            }
            else
            {
                return res.status(500).json(err); 
            }
    })
})


router.patch('/update',auth.authenticateToken,(req, res)=>{
    let user = req.body
    var query = "update user set status=? where id = ?"
 
    connection.query(query, [user.status, user.id],(res,results) =>{
            if (!err)
            {
                if (results.affectedRows == 0)
                {
                    return res.status(404).json({message: "user id do no available"}); 

                }
                else
                {
                    return res.status(200).json({message: "User updated successfull"}); 
                }
                
            }
            else
            {
                return res.status(500).json(err); 
            }
    })
})


router.get('/update',auth.authenticateToken,(req, res)=>{

    return res.status(200).json({message: "true"});  
 

})


router.get('/changePassword',auth.authenticateToken,(req, res)=>{

    return res.status(200).json({message: "true"});  
 

})
 
