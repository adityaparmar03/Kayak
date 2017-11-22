var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;

// Adding Redis Cache Config
// Comment this code to switch off caching
// Refer ReadME for redis server config

    // var redis = require('ioredis');
    // var MongooseRedis = require('mongoose-with-redis');
    // var redisClient = redis.createClient();
    //
    // var cacheOptions = {
    //     cache: true,
    //     expires: 60, // keeping it low for now , will extend in future
    //     prefix: 'RedisCache'
    // };
    // MongooseRedis(mongoose, redisClient, cacheOptions);

// End of Redis Config

var FlightSchema   = new Schema({

    flightId:String,
    operator: String,
    flights: Array
//Sample
    /*flights:[
        {
            'arrival': '16:00'
            'departure': '00:00',
            'origin': {'city':'San Jose', 'state':'CA', 'country':'USA'}
            'destination': {'city':'Delhi', 'state':'Delhi', 'country':'India'}
            'class':{

                'type':'economy','price':'$1000', 'capacity':100},
                'type':''first','price':'$2000' , 'capacity':100},
                'type':''business','price':'$3000' , 'capacity':100}
            }
        }
    ]*/
});

module.exports = mongoose.model('MmtFlights', FlightSchema, 'MmtFlights');
