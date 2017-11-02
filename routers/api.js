/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();

//返回统一的对象
var responseData;
router.use(function(req,res,next){
    responseData = {
        code: 0,
        message: ''
    }
    next();
});

/*
* 用户注册
*   注册逻辑
*   用户名不能为空
*   密码不能为空
*   两次密码必须一致
*
*   1.用户名是否被注册-数据库查询
* */
router.post('/user/register',function(req,res,next){
    var json = req.body;
    var username = json.username;
    var password = json.password;
    var repassword = json.repassword;

})

module.exports = router;