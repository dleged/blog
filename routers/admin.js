/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();

router.get('/user',function(req,res,next){
    res.send('user');
})

module.exports = router;

