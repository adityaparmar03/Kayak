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

mongoose.connect('mongodb://localhost:27017/cmpe273_kayak').then(function(){
	  console.log(" Connected to DropBox Mongo DB ".green);
	}).catch(err => console.error(err));

var FlightSchema   = new Schema({

    flightId:String,
    operator: String,
    class:Array,
    flights: Array

//Sample
    /*  'class':{

          'type':'economy','price':'$1000', 'capacity':100},
           'type':''first','price':'$2000' , 'capacity':100},
            'type':''business','price':'$3000' , 'capacity':100}
        },
      flights:[
           {
              'arrivaltime': '16:00',
              'arrivalday' : 'Monday'
              'departuretime': '00:00',
              'departureday' : 'Wednesday',
              'origin': {'city':'San Jose', 'state':'CA', 'country':'USA', 'airport':'SJC'},
              'destination': {'city':'Delhi', 'state':'Delhi', 'country':'India', 'airport':'IGI'}

          }
      ]*/
});

module.exports = mongoose.model('MmtFlights', FlightSchema, 'MmtFlights');
