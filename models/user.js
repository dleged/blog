/**
 * Created by $ on 2017/11/1.
 */

var mongoose = require('mongoose');
var UserBase = require('../schemas/users');

module.exports = mongoose.model('user',UserBase);