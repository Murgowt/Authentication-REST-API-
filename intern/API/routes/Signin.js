//Imports
const express=require('express');
const router=express.Router();
const encrypt=require('bcrypt-nodejs');
const conn=require('../Config/DataBase');
const jwt=require('jsonwebtoken');

router.post('/',(request,response,next)=>
{
    sqlquery=('select * from users where username=(?)');
    var success;
    var jwtoken='failed';
    var result;
    conn.query(sqlquery,[request.body.username],function(error,rows,fields)
    {
        if(error)
        {
            console.log('error');
            result={success:0,"jtkon":jwtoken};
        }
        else
        {
            console.log('No error')
            const tempresult=encrypt.compareSync(request.body.password,rows[0].password); 
            console.log(tempresult,"result");
            if(tempresult===true)
            {
                console.log('true is result the');
                tempresult.password=0;
                jwtoken=jwt.sign({user:request.body.username},"ab123cd");
                console.log(jwtoken);
                result={success:1,"jtkon":jwtoken};
            }
            
            else 
            {
                console.log('No result true the');
                result={success:0,"jtkon":jwtoken};
            }
            

            response.json({success:success,"jtoken":jwtoken});
        }
        
    });
});

module.exports=router;

