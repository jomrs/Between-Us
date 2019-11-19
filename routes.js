var express = require('express');
var router = express.Router();
const path = require('path');


router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+"/src/pages/conect.html"));
});

router.get('/src/style.css', (req, res)=>{
    res.sendFile(path.join(__dirname+"/src/style.css"));
})

router.get('/src/peerjs.js', (req, res)=>{
    res.sendFile(path.join(__dirname+"/src/peerjs.js"));
});

router.get('/src/api/peerjs.js', (req, res)=>{
    res.sendFile(path.join(__dirname+"/src/api/peerjs.js"));
});

router.get('/.well-known/acme-challenge/wQDwPg-xA37ttVMKjnsWKtWNf61MiHynJELZ5INW1jw.2fak2FD5ytbmXsSxqE0ml601hIvjrhjw6TqW3abTomE', (req, res)=>{
    res.sendFile(path.join(__dirname+"/.well-known/acme-challenge/wQDwPg-xA37ttVMKjnsWKtWNf61MiHynJELZ5INW1jw.2fak2FD5ytbmXsSxqE0ml601hIvjrhjw6TqW3abTomE"));
});


module.exports = router;
