const express = require('express');
const app = express();
const ExpressPeerServer = require('peer').ExpressPeerServer;
const routes = require('./routes');


// ======= using routes file

app.use('/', routes);
// =======

const server = app.listen(8000, ()=>{
    console.log("servidor rodando...");
});
 
const options = { //debug is on
    debug: true
}
 
const peerserver = ExpressPeerServer(server, options);
//console.log("servidor peer:", peerserver); 

app.use('/api', peerserver);