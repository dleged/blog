/**
 * Created by $ on 2017/11/1.
 */
var mongoose = require('mongoose');
/*
* 创建表结构
* */
module.exports = new mongoose.Schema({
    username: String,
    password: String
})