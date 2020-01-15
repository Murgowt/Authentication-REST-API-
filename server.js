//Imports
const http=require('http');
const app=require('./app');

//Running the Server on Local Host
const server=http.createServer(app);
server.listen(3000);
