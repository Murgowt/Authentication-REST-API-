//Imports
const express=require('express');
const BodyParser=require('body-parser');
const SignupRoute=require('./API/routes/signup');
const SigninRoute=require('./API/routes/signin');

const app=express();
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());

//Every Request is Funneled through here.
app.use('/signup',SignupRoute); 
app.use('/signin',SigninRoute);


app.use('/',(request,response,next)=>{
    response.status(200).json({message:"Welcome to My World!!"});
})

//For Managing Error (if any occured)
app.use((request,response,next)=>{
    const error=new Error('404 NOT FOUND');
    error.status= 404 ;
    next(error);//Forward the Error Request
});
app.use((error,request,response,next)=>{   
    response.status(error.status || 500);
    response.json({message:error.message })
})


module.exports= app;