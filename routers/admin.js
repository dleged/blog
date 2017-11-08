/**
 * Created by $ on 2017/11/1.
 */
var express = require('express');
var router = express.Router();
var UserBase = require('../models/user');
var CategoryBase = require('../models/category');

//返回统一的对象
var responseData;
router.use(function(req,res,next){
    responseData = {
        code: 0,
        message: ''
    }
    next();
});

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
                responseData: {
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


/*博客分类添页面*/
router.get('/category',function(req,res,next){
    responseData.code = 1;
    res.render('admin/category',{
        userInfo: req.userInfo,
        responseData: responseData
    });
})

/*博客分类保存*/
router.post('/category',function(req,res,next){
    var type = req.body.type;
    var mark = req.body.mark;
    if(!type || !mark){
        responseData.code = 0;
        responseData.message = '分类信息不能为空!';
        return res.render('admin/category',{
            userInfo: req.userInfo,
            responseData: responseData
        });
    }else{
        /*分类是否存在*/
        CategoryBase.findOne({type: type}).then(function(category){
            if(category){
                responseData.code = 0;
                responseData.message = '该分类已经存在!';
            }else{
                responseData.code = 1;
                responseData.message = '新增分类成功!';
                var category = new CategoryBase({
                    type: type,
                    mark: mark
                });
                category.save();
            }
            res.render('admin/category',{
                userInfo: req.userInfo,
                responseData: responseData
            });
        });
    }



});
module.exports = router;

