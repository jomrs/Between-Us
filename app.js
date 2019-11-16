var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var routes = require('./routes');

// ======= using routes file

app.use('/', routes);

// =======

var server = app.listen(9000, ()=>{
    console.log("servidor rodando...");
});
 
var options = { //debug is on
    debug: true
}
 
var peerserver = ExpressPeerServer(server, options);
//console.log("servidor peer:", peerserver); 

app.use('/api', peerserver);