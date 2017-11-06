/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('main/index',{
        userInfo: req.userInfo
    });
})

module.exports = router;