var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;

### Adding Redis Cache Config
### Comment this code to switch off caching
### Refer ReadME for redis server config

var redis = require('ioredis');
var MongooseRedis = require('mongoose-with-redis');
var redisClient = redis.createClient();

var cacheOptions = {
  cache: true,
  expires: 60, // keeping it low for now , will extend in future
  prefix: 'RedisCache'
};
MongooseRedis(mongoose, redisClient, cacheOptions);

## End of Redis Config


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
    reviews : Array,
    rating: Number,
    rooms : Object
    //{
    // roomtype: 'delux', 'price':'$120', 'rooomcount':100},
    // roomtype:'premium','price':'$220', 'rooomcount':100},
    // roomtype:'suite','price':'$320', 'rooomcount':100}
    // }

});

module.exports = mongoose.model('Hotel', HotelSchema);
