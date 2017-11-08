/**
 * Created by $ on 2017/11/8.
 */
var mongoose = require('mongoose');
var CategoryBse = require('../schemas/categorys.js');

module.exports = mongoose.model('categorys',CategoryBse);

