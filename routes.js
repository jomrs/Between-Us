var express = require('express');
var router = express.Router();
const path = require('path');


router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+"/src/pages/conect.html"));
});

router.get('/src/style.css', (req, res)=>{
    res.sendFile(path.join(__dirname+"/src/style.css"));
})
module.exports = router;