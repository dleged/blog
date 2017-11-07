/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();
var UserBase = require('../models/user');

/*管理后台首页*/
router.get('/',function(req,res,next){
    res.render('admin/index',{
        userInfo: req.userInfo
    });
})

/*用户列表*/
router.get('/user',function(req,res,next){
    /*从用户数据库中读取用户数据*/
    var limit = 5; //读取的条数
    var page = Number(req.query.page || 1);//当前页数
    var skip = 0; //（当前页-1）*limit 跳过的条数;
    var pages = 0;//总条数

    UserBase.count().then(function(count){
        pages = Math.ceil(count/limit);
        page = Math.min(page,pages); //page不能超过总页数
        page = Math.max(page,1);     //page不能小于第1页
        skip = (page - 1) * limit;
        UserBase.find().limit(limit).skip(skip).then(function(users){
            res.render('admin/user_index',{
                userInfo: req.userInfo,
                blogData: {
                    code: 1,
                    message: '用户查询成功！',
                    data: users,
                    count: count,
                    pages: pages,
                    page: page,
                    limit: limit
                }
            });
        });
    })

})


/*博客分类*/
router.get('/category',function(req,res,next){
    res.render('admin/category_index',{
        userInfo: req.userInfo
    });
})

module.exports = router;

