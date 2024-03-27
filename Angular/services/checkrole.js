// Adding require('dotenv').config() allows you to load environment variables from a .env file into process.env. 
// This is useful for keeping sensitive information like API keys, database credentials, and other 
// configuration variables separate from
//  your codebase.

require('dotenv').config();


function  checkrole(req,res,next)
{

    if ( res.locals.role == process.env.USER)
    {
        res.sendStatus(401);
    }

    else{
        next();

    }


    
}


module.exports = {checkrole: checkrole}