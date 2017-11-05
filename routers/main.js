/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('main/index',{
        userInfo: JSON.parse(req.userInfo)
    });
    console.log(11111,JSON.parse(req.userInfo));
})

module.exports = router;