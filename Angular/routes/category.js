const express = require('express');


const  connection = require('../connection');

const router = express.Router();

const jwt = require('jsonwebtoken');

 // Handle POST request to create a new user
 require('dotenv').config();

 var auth = require('../services/authentication');

var checkrole = require('../services/checkrole');

router.post('/add',auth.authenticateToken,checkrole.checkrole,(req, res)=>{

    let category = req.body;

    query = "insert into category (name) values(?)";

    connection.query(query, [category.name],(err, results) =>{
        if (!err)
        {
    // let category = req.body;
                return res.status(200).json({message: "category added successfully"})
        }

        else{
            return res.status(500).json(err); 
        }
    })
  
})

router.get('/get',auth.authenticateToken,(req, res,next)=>{
    var query = "select * from category order by name"
    connection.query(query,(err, results) =>{
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



router.patch('/update',auth.authenticateToken,checkrole.checkrole,(req, res,next)=>{

    let product = req.body;

    query = "insert into category set name =? where id =?";

    connection.query(query, [product.name, product.id],(err,results) =>{
        if (!err)
        {

            if (results.affectedRows == 0)
            {
                return res.status(404).json({message: " category id do no available"}); 
            }
            else
            {
                return res.status(200).json({message: "category updated successfull"}); 
            }

        }
        else{
            return res.status(500).json(err); 
        }
    })
  
});


module.exports=router;