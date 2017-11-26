
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
      console.log('-------booking is------- ' + booking);
      if(tripType=='One-Way'){
            // Save the one way booking
            console.log("is one way trip");
            var isAvailable = checkFlightAvailable(booking);
            var res = {};
            var err = {};
            if(isAvailable){
                res.code = 200;
                res.value = [{'flight' : 'test'}];
            }else{
                err.code = 402;
                err.message = "Flight is not available to book for current selections!";
            }
            callback(err, res);
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
          booking.originCity = booking.destinationcity;
          booking.originState = booking.destinationstate;
          booking.destinationCity = booking.origincity;
          booking.destinationState = booking.originstate;
          booking.tripType = booking.triptype;
          booking.flightClass = booking.flightclass;
          booking.bookingStartDate = booking.returnstartdate
          booking.bookingEndDate = booking.returnenddate;
          booking.passengerCount = booking.passengers;
          booking.price = booking.price;
          booking.flightId = booking.return_target_id;
          booking.vendor = booking.vendor;
      }
      return booking;
}

function checkFlightAvailable(booking){
      return true; // TODO : add the availability logic
}

exports.searchFlights=searchFlights;
exports.bookFlight=bookFlight;
