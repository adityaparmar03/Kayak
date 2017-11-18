var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


var CarSchema   = new Schema({

    carId:String,
    cartype: String,
    pickupdate: Date,
    dropoffdate: Date,
    pickupaddress: Object,  //{'street':'101 E San Fernando St.','city':'San Jose', 'state': 'CA', 'country':'USA'}
    dropoffaddress: Object,
    dailyrent: String

});

module.exports = mongoose.model('Car', CarSchema);
