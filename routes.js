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


module.exports = router;