const mysql=require('mysql');
const express=require('express');

const app=express()
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'ModelsDB',
});

connection.connect(function(error) {
    if(!!error)
    console.log('Error Occured');
    else
    console.log("Connection Succesful");
});

module.exports=connection;