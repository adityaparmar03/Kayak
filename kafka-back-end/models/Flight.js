var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


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

module.exports = mongoose.model('Flight', FlightSchema);
