var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;



var HotelSchema   = new Schema({

    hotelId:String,
    name:String,
    description:String,
    address: Object, //{'street':'101 E San Fernando St.','city':'San Jose', 'state': 'CA', 'country':'USA', 'zip':'95112'}
    stars: Number,
    reviews : Array,
    rating: Number,
    rooms : Array,
    imageurl:String
    //[
    // {roomtype: 'delux', 'price':'$120', 'rooomcount':100},
    // {roomtype:'premium','price':'$220', 'rooomcount':100},
    // {roomtype:'suite','price':'$320', 'rooomcount':100}
    // ]

});

module.exports = mongoose.model('CleartripHotels', HotelSchema, 'CleartripHotels');
