var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


var options = {
    useMongoClient: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 20,
    bufferMaxEntries: 0
};

mongoose.connect('mongodb://localhost:27017/cmpe273_kayak', options); // connect to our database



var HotelSchema   = new Schema({

    hotelId:String,
    name:String,
    city: String,
    state: String,
    street: String,
    country: String,
    zipcode: String,
    stars: Number,
    rating: Number,
    rooms : Array, //{'type':'suite', 'price':'$120', 'availability':'booked'}
    reviews : Array
});

module.exports = mongoose.model('Hotel', HotelSchema);
