// Search for all car on the basis of city, state and trip type
function searchCars(msg, callback){

    var temp = '../models/'+msg;
    var cleartrip = require('../models/'+msg);

    var res = {}
    // var pickupcity = msg.searchcriteria.pickupcity;
    // var pickupstate = msg.searchcriteria.pickupstate;
    // var dropoffcity = msg.searchcriteria.dropoffcity;
    // var dropoffstate = msg.searchcriteria.dropoffstate;
    // var triptype = msg.searchcriteria.triptype;

   // if(triptype=='One-Way'){

    cleartrip.find({},function (err, cars) {

            if (err) {
                throw err;
                console.log("Error in searching for cars")
            }
            else {
                console.log("Iam here");
                console.log("Car List:", cars)
                res.code = "200";
                res.value = cars;

                callback(null, res);
            }

        });
    // }
    //
    // else{
    //
    //     Car.find({'pickupaddress.city': pickupcity,
    //         'pickupaddress.state': pickupstate,
    //         'dropoffaddress.city': dropoffcity,
    //         'dropoffaddress.state': dropoffstate,
    //         'pickupaddress.city': dropoffcity,
    //         'pickupaddress.state': dropoffstate,
    //         'dropoffaddress.city': pickupcity,
    //         'dropoffaddress.state': pickupstate
    //     }, function (err, cars) {
    //
    //         if (err) {
    //             throw err;
    //             console.log("Error in searching for cars")
    //         }
    //         else {
    //
    //             console.log("Car List:", cars)
    //             res.code = "200";
    //             res.value = cars;
    //
    //             callback(null, res);
    //         }
    //
    //     });
    // }

}

exports.searchCars = searchCars;




