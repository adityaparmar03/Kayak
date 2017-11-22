var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/cmpe273_kayak');

var CarSchema   = new Schema({

    cartype: String,
    dailyrent: String

});

module.exports = mongoose.model('MMT', CarSchema);
