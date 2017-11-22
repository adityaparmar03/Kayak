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

mongoose.connect('mongodb://localhost:27017/cmpe273_kayak');

var CarSchema = new Schema({

    cartype: String,
    dailyrent: String

});

module.exports = mongoose.model('cleartrip', CarSchema);
