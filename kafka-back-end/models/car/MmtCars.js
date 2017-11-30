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
