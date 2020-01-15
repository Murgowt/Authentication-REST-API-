/* This Module is used to validate the JWT Token and should be routed through when we access any page 
    after login  page.(Except the login and Sign up Pages.*/
const jwt= require('jsonwebtoken');

module.exports = {
    valToken:(request,response,next)=>{
        const token =request.get('authorization');
        if(token)
        {
            token = token.slice(7);
            jwt.verify(token, "ab123cd",(error,decodedobj)=>
            {
                if(error)
                response.json({success:0,message:"Invalid Token"});
                else{
                    next();
                }
            });
            
        }
        else
        {
            response.json({success:0,message:"Acces Denied"})
        }
    }
}