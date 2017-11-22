
// Search for all flightss on the basis of city, state and class
function searchFlights(msg, callback){

    var flight = require('../models/flight/'+msg.vendor);

    var res = {};
    var origincity = msg.searchcriteria.origincity;
    var originstate = msg.searchcriteria.originstate;
    var destinationcity = msg.searchcriteria.destinationcity;
    var destinationstate = msg.searchcriteria.destinationstate;
    var triptype = msg.searchcriteria.triptype;
    var flightclass = msg.searchcriteria.flightclass;
    var capacity;

    if(triptype=='One-Way'){

        flight.find({'flights.origin.city': origincity,
                        'flights.origin.state': originstate,
                        'flights.destination.city': destinationcity,
                        'flights.destination.state': destinationstate,
                        'flights.class.type': flightclass,
                        'flights.class.capacity': capacity
                    }, function (err, flights) {

            if (err) {
                throw err;
                console.log("Error in searching for flights")
            }
            else {

                console.log("Flight List:", flights)
                res.code = "200";
                res.value = flights;

                callback(null, res);
            }

        });
    }

    else{

        flight.find({'flights.origin.city': origincity,
                        'flights.origin.state': originstate,
                        'flights.destination.city': destinationcity,
                        'flights.destination.state': destinationstate,
                        'flights.origin.city': destinationcity,
                        'flights.origin.state': destinationstate,
                        'flights.destination.city': origincity,
                        'flights.destination.state': originstate,
                        'flights.class.type': flightclass,
                        'flights.class.capacity': capacity
                    }, function (err, flights) {

            if (err) {
                throw err;
                console.log("Error in searching for flights")
            }
            else {

                console.log("Flight List:", flights)
                res.code = "200";
                res.value = flights;

                callback(null, res);
            }

        });
    }

}

