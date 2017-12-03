var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


var FlightSchema   = new Schema({

    flightId:String,
    operator: String,
    class:Array,
    flights: Array,
    imageurl:String

//Sample
    /*  'class':{

          'type':'economy','price':'$1000', 'capacity':100},
           'type':''first','price':'$2000' , 'capacity':100},
            'type':''business','price':'$3000' , 'capacity':100}
        },
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

module.exports = mongoose.model('CleartripFlights', FlightSchema, 'CleartripFlights');
