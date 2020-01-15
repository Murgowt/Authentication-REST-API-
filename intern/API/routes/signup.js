//Imports
const express=require('express');
const router=express.Router();
const encrypt=require('bcrypt-nodejs');
const conn=require('../Config/DataBase')
router.post('/',(request,response,next)=>
{
    var salt=encrypt.genSaltSync(10);
    request.body.password=encrypt.hashSync(request.body.password,salt);
    const credentials={ 
        username: request.body.username, 
        password: request.body.password 
    };
    
    console.log(request.body.username,request.body.password)
    sqlquery=('insert into users values(?,?)');
    conn.query(sqlquery,[credentials.username,credentials.password],function(error,rows,fields)
    {
        if(!!error)
        console.log('Error in query');
        else
        {
        console.log('Sign Up Succesful');
        console.log(rows);
        }
    });
    response.status(200).json({ message:"handling Fine!",credentials:credentials });
});
module.exports=router;