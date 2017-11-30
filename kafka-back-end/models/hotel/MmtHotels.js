var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;

// Adding Redis Cache Config
// Comment this code to switch off caching
// Refer ReadME for redis server config

    /*var redis = require('ioredis');
    var MongooseRedis = require('mongoose-with-redis');
    var redisClient = redis.createClient();

    var cacheOptions = {
        cache: true,
        expires: 60, // keeping it low for now , will extend in future
        prefix: 'RedisCache'
    };
    MongooseRedis(mongoose, redisClient, cacheOptions);
*/
// End of Redis Config


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

module.exports = mongoose.model('MmtHotels', HotelSchema, 'MmtHotels');
