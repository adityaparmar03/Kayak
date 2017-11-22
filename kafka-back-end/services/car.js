// Search for all car on the basis of city, state and trip type
function searchCars(msg, callback){

    var car = require('../models/car/'+msg.vendor);

    var res = {}
     var pickupcity = msg.searchcriteria.pickupcity;
     var pickupstate = msg.searchcriteria.pickupstate;
     var dropoffcity = msg.searchcriteria.dropoffcity;
     var dropoffstate = msg.searchcriteria.dropoffstate;
     var triptype = msg.searchcriteria.triptype;

    if(triptype=='One-Way'){

    car.find({'pickupaddress.city': pickupcity,
        'pickupaddress.state': pickupstate,
        'dropoffaddress.city': dropoffcity,
        'dropoffaddress.state': dropoffstate
    },function (err, cars) {

            if (err) {
                throw err;
                console.log("Error in searching for cars")
            }
            else {

                console.log("Car List:", cars)
                res.code = "200";
                res.value = cars;

                callback(null, res);
            }

        });
    }

    else{

        car.find({'pickupaddress.city': pickupcity,
            'pickupaddress.state': pickupstate,
            'dropoffaddress.city': dropoffcity,
            'dropoffaddress.state': dropoffstate,
            'pickupaddress.city': dropoffcity,
            'pickupaddress.state': dropoffstate,
            'dropoffaddress.city': pickupcity,
            'dropoffaddress.state': pickupstate
        }, function (err, cars) {

            if (err) {
                throw err;
                console.log("Error in searching for cars")
            }
            else {

                console.log("Car List:", cars)
                res.code = "200";
                res.value = cars;

                callback(null, res);
            }

        });
    }

}

exports.searchCars = searchCars;




