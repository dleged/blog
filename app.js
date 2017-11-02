/**
 * Created by $ on 2017/11/1.
 * 应用启动文件的入口文件
 */

var express = require('express');
var swig = require('swig');//模块引擎
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var DB_NAME = 'mongodb://localhost:27017/blog';
//创建app应用 ==》nodeJs 中的http.createServer();
var app = express();
var router = express.Router();
/*
* 配置模板引擎
* 定义当前应用所使用的模板引擎
* 第一个参数：模板的名称，也即是文件的后缀，第二个参数：表示用于解析处理模板内容的方法
* */
app.engine('html',swig.renderFile);
//设置使用模板的目录，第一个参数必须是views，第二个参数是模板的路径
app.set('views','./views');
//注册所使用的模板，第一个参数必须是view engine，第二个参数为app.engine这个方法中配置模板名称（第一个参数）
app.set('view engine','html');
//设置swig页面不缓存
swig.setDefaults({
    cache: false
})

/*bodyParse设置*/
app.use(bodyParser.urlencoded({extended: true}));
/*
* 设置静态文件托管
* */
app.use('/public',express.static(__dirname + '/public'));

/*
* 根据不同的功能划分模块
* */
app.use('/',require('./routers/main'));
app.use('/api',require('./routers/api'));
//app.use('/admin',require('./routers/admin'));

//监听http请求
//用户发送http - url - 解析路由 - 找到匹配规则 -
// 指定绑定函数，返回对象内容至用户

MongoClient.connect(DB_NAME,function(err,db){
    if(err){
        console.info('**********连接mongoose数据失败**********');
    }else{
        console.info('**********连接mongoose数据成功**********');
        router
        app.listen('5555');
        console.info('**********服务器启动成功**********');
    }
})