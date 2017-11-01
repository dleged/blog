/**
 * Created by $ on 2017/11/1.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

//用户表用于数据操作
module.exports = mongoose.model('User',userSchema)