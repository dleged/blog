/**
 * Created by $ on 2017/11/8.
 */
var Schema = require('mongoose').Schema;

var category = new Schema({
        type: String,
        mark: String,
        createTime: {
            type: Date,
            default: Date.now
        }
})

module.exports = category;