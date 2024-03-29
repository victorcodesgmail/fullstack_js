const express = require('express');


const  connection = require('../connection');

const router = express.Router();

const jwt = require('jsonwebtoken');

 // Handle POST request to create a new user
 require('dotenv').config();




 var auth = require('../services/authentication');

var checkrole = require('../services/checkrole');

 router.post('/add',auth.authenticateToken,checkrole.checkrole,(req, res)=>{

    let product = req.body;

    query = "insert into product (name, categoryID, description,price,  status ) values(?,?,?,?,'true')";

    connection.query(query, [product.name, product.categoryID,product.description,product.price ],(err, res) =>{
        if (!err)
        {
    // let category = req.body;
                return res.status(200).json({message: "product added successfully"})
        }

        else{
            return res.status(500).json(err); 
        }
    })
  
});



router.get('/get',auth.authenticateToken,(req, res,next)=>{
var query = "select p.id , p.name, p.description , p.price p.status c.name as  categoryName from product as p INNER JOIN  category as c on p.category = c.id"
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
});

router.get('/getBycategory', auth.authenticateToken,(req,res,next)=>
{

    const  id = req.params.id;

    var query = "select id ,  name, description,price from product where  id = ? "


    connection.query(query,[id],(err, results) =>{


            if (!err)
            {
                return res.status(200).json(results); 
            }
            else
            {
                return res.status(500).json(err); 
            }

    })

});

router.get('/getById/:id', auth.authenticateToken,(req,res,next)=>
{

    const  id = req.params.id;

    var query = "select id ,  name from product where  categoryID= ? and status= 'true'"


    connection.query(query,[id],(err, results) =>{


            if (!err)
            {
                return res.status(200).json(results); 
            }
            else
            {
                return res.status(500).json(err); 
            }

    })

});



router.patch('/update',auth.authenticateToken,checkrole.checkrole,(req, res,next)=>{

    let product = req.body;

    query = "update product set name =? ,categoryID =? ,description=?, price where id =?";

    connection.query(query, [product.name, product.categoryID, product.description, product.price, product.id],(err,res) =>{
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

router.delete('/delete',auth.authenticateToken,checkrole.checkrole,(req, res, next)=>{

    
    const id = req.params.id;


    var query = "delete into product  where id = ?";

    connection.query(query, [id ],(err, results) =>{
        if (!err)
        {
    // let ategory = req.body;
                return res.status(200).json({message: "product added successfully"})
        }

        else{
            return res.status(500).json(err); 
        }
    })
  
});


router.patch('/updateStatus',auth.authenticateToken,checkrole.checkrole,(req, res,next)=>{

    let user  = req.body;

    var query = "update product set status=? where id =?";

    connection.query(query, [user.status,user.id],(err,res) =>{
        if (!err)
        {

            if (results.affectedRows == 0)
            {
                return res.status(404).json({message: "  produt do no available"}); 
            }
            else
            {
                return res.status(200).json({message: "produt status updated successfull"}); 
            }

        }
        else{
            return res.status(500).json(err); 
        }
    })
  
});


 module.exports=router;