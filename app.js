var express = require('express'); 
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var routes = require('./routes');

// ======= using routes file

app.use('/', express.static(__dirname, { dotfiles: 'allow' } ), routes);
// =======

const server = app.listen(process.env.PORT || 8000, ()=>{
    console.log("servidor rodando...");
});
 
const options = { //debug is on
    debug: true
}
 
const peerserver = ExpressPeerServer(server, options);
//console.log("servidor peer:", peerserver); 

app.use('/api', peerserver);
