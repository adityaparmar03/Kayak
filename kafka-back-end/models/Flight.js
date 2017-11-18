var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


var FlightSchema   = new Schema({

    flightId:String,
    operator: String,
    flightdetails: Array
//Sample
    /*flightdetails:[
        {
            'arrival': '16:00'
            'departure': '00:00'
            'origin': 'San Jose'
            'destination': 'New Delhi'
            'classes':{

                'economy':{'price':'$1000', 'capacity':100},
                'first':{'price':'$2000' , 'capacity':100},
                'business':{'price':'$3000' , 'capacity':100}
            }
        }
    ]*/
});

module.exports = mongoose.model('Flight', FlightSchema);
