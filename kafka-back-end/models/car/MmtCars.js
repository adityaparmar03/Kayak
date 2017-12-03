var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


var CarSchema   = new Schema({

    carId:String,
    cartype: String,
    carmodel:String,
    specification: String,
    pickupaddress: Object,  //{'street':'101 E San Fernando St.','city':'San Jose', 'state': 'CA', 'country':'USA'}
    dropoffaddress: Object,
    dailyrent: Number,
    imageurl:String

});

module.exports = mongoose.model('MmtCars', CarSchema, 'MmtCars');
