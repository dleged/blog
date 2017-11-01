/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();

/*
* 用户注册
* */

router.post('./user/register',function(req,res,next){
    console.log(req.body);
})
module.exports = router;