var _ = require("underscore");


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
                        'flights.class.type': flightclass/*,
                        'flights.class.capacity': capacity*/
                    }, function (err, flights) {

            if (err) {
                throw err;
                console.log("Error in searching for flights" + err);
                callback(err, null);
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
                console.log("Error in searching for flights" + err);
                callback(err, null);
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



// Book the flights of different vendors
function bookFlight(msg, callback){
      var booking = msg;
      var tripType = booking.triptype;

      console.log('-------booking is-------' + tripType);
      if(tripType=='One-Way'){
            // Save the one way booking
            console.log("is one way trip");
            var isAvailable = checkFlightAvailable(booking, function(isAvailable){
                  var res = {};
                  if(isAvailable){
                      res.code = 200;
                      res.value = [{'flight' : 'test'}];
                  }else{
                      res.code = 402;
                      res.value = "Flight is not available to book for current selections!";
                  }
                  callback(null, res);
            });

      }

      else{
           // Save the two way booking
           var returnBooking = getReturnBooking(booking);
             callback(null, {'flight' : 'test'});
      }

}

function getReturnBooking(booking){
      var booking = {};
      if(booking != undefined){
          booking.origincity = booking.destinationcity;
          booking.originstate = booking.destinationstate;
          booking.destinationcity = booking.origincity;
          booking.destinationstate = booking.originstate;
          booking.triptype = booking.triptype;
          booking.flightclass = booking.flightclass;
          booking.bookingstartdate = booking.returnstartdate
          booking.bookingenddate = booking.returnenddate;
          booking.passengercount = booking.passengers;
          booking.price = booking.price;
          booking.flightid = booking.returnflightid;
          booking.vendor = booking.vendor;
      }
      return booking;
}

function checkFlightAvailable(booking, callback){
      var flight = require('../models/flight/'+booking.vendor);
      console.log(booking.triptype);
      if(booking.triptype == 'One-Way'){
            flight.find({'flightId': booking.flightid}, function (err, flights) {
                if (err) {
                    console.log("Error in searching for flight" + err);
                    callback(false);
                }
                else {
                    if(flights != undefined){
                      var capacity = getFlightCapacity(flights, booking);
                      console.log("capacity is " + capacity);
                      if(capacity - booking.passengercount > 0)
                            callback(true);
                      else
                            callback(false);
                    }else{
                      callback(false);
                    }
                }
            });
      }else{

      }

}

function getFlightCapacity(flights, booking){
      var classType = _.where(flights[0].flights[0].class, {type: booking.flightclass});
      return classType[0].capacity;
}

exports.searchFlights=searchFlights;
exports.bookFlight=bookFlight;
