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
            res.render('admin/user_list',{
                userInfo: req.userInfo,
                responseData: {
                    code: 1,
                    message: '用户查询成功！',
                    data: users,
                    /*分页组件参数*/
                    count: count,
                    pages: pages,
                    page: page,
                    limit: limit,
                    url: '/admin/user'
                }
            });
        });
    })
})

/*博客分类添页面*/
router.get('/category/add',function(req,res,next){
    responseData.code = 1;
    res.render('admin/category_add',{
        userInfo: req.userInfo,
        responseData: responseData
    });
})

/*博客分类添加*/
router.post('/category/add',function(req,res,next){
    var type = req.body.type;
    var mark = req.body.mark;
    var author = req.userInfo.username;
    if(!type || !mark){
        responseData.code = 0;
        responseData.message = '分类信息不能为空!';
        return res.render('admin/category_add',{
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
                    mark: mark,
                    author: author
                });
                category.save();
            }
            res.render('/admin/category_add',{
                userInfo: req.userInfo,
                responseData: responseData
            });
        });
    }
});

/*博客类型列表查询*/
router.get('/category',function(req,res,next){
    /*从用户数据库中读取用户数据*/
    var limit = 5; //读取的条数
    var page = Number(req.query.page || 1);//当前页数
    var skip = 0; //（当前页-1）*limit 跳过的条数;
    var pages = 0;//总条数
    CategoryBase.count().then(function(count){
        pages = Math.ceil(count/limit);
        page = Math.min(page,pages); //page不能超过总页数
        page = Math.max(page,1);     //page不能小于第1页
        skip = (page - 1) * limit;
        /*
        * sort()：按照字段排序，1顺序，-1倒序
        * */
        CategoryBase.find().sort({_id: -1}).limit(limit).skip(skip).then(function(categorys){
            res.render('admin/category_list',{
                userInfo: req.userInfo,
                responseData: {
                    code: 1,
                    message: '列表查询成功！',
                    data: categorys,
                    /*分页组件参数*/
                    count: count,
                    pages: pages,
                    page: page,
                    limit: limit,
                    url: '/admin/category'
                }
            });
        });
    })
})

/*博客类型删除*/
router.get('/category/delete',function(req,res,next){
    var _id = req.query.id;
    console.log(req.query);
    CategoryBase.remove({id:_id}, function(err){
            if(!err){
                res.render('admin/category_list',{
                    responseData: {
                        code: 1,
                        message: '删除成功！'
                    }
                })
            }
        });
})

/*博客类型编辑*/
router.post('/category/editor',function(req,res,next){
    var id = req.body.id || '';
    var type = req.body.type || '';
    var mark = req.body.mark || '';

    if(!type || !mark){
        responseData.code = 0;
        responseData.message = '分类信息不能为空!';
        res.json({
            userInfo: req.userInfo,
            responseData: responseData
        });
    }

    CategoryBase.findOne({_id: id}).then(function(category){
        /*没有更名保存*/
       if(category.type === type){
           responseData.code = 1;
           responseData.message = '保存成功!';
           return res.json({
               userInfo: req.userInfo,
               responseData: responseData
           });
       }else{
           /*修改过后保存验证,*/
           CategoryBase.findOne({_id: {$ne:id},type:type}).then(function(category){
               if(category){//存在同名
                   responseData.code = 0;
                   responseData.message = '分类名已存在!';
                   return res.json({
                       userInfo: req.userInfo,
                       responseData: responseData
                   });
               }else{
                   /*更改更新*/
                   CategoryBase.update({_id: id},{type: type,mark: mark}).then(function(err){
                       if(!err){
                           responseData.code = 1;
                           responseData.message = '保存成功!';
                           return res.json({
                               userInfo: req.userInfo,
                               responseData: responseData
                           });
                       }
                   })
               }
           });
       }
    })
})

/*博客文章列表*/
router.get('/content',function(req,res,next){
    res.render('admin/content_list',{
        userInfo: req.userInfo
    })
})

/*博客文章添加页面*/
router.get('/content/add',function(req,res,next){
    res.render('admin/content_add',{
        userInfo: req.userInfo,
        responseData: responseData
    })
})

module.exports = router;

