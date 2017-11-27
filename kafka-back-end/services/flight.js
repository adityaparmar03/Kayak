var _ = require("underscore");
var mysql = require('../models/mysql');

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
                        'class.type': flightclass/*,
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
                        'class.type': flightclass
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



// Book the flight
function bookFlight(msg, callback){
      var booking = msg.booking;
      var email = "meenakshi.paryani@gmail.com"; //msg.email - TODO : uncomment this after stable
      var tripType = booking.flight.triptype;

      console.log('-------booking is-------' + tripType);
      if(tripType=='One-Way'){
            // Save the one way booking
            console.log("is one way trip");
            var isAvailable = checkFlightAvailable(booking.flight, null, function(isAvailable){
                  var res = {};
                  if(isAvailable){
                      // Proceed to Booking
                       // TODO : Add credit card fields
                      var bookingSql="insert into BILLING(`user_email`,`target_id`,`booking_type`,`billing_amount`,`target_count`,`source_city`,`source_state`,`destination_city`,`destination_state`,`trip_type`,`booking_class`,`booking_start_date`,`booking_end_date`) values('"+email+"','"+booking.flight.flightid+"','"+'FLIGHT'+"','"+booking.flight.price+"','"+booking.flight.passengers+"','"+booking.flight.origincity+"','"+booking.flight.originstate+"','"+booking.flight.destinationcity+"','"+booking.flight.destinationstate+"','"+booking.flight.triptype+"','"
                      +booking.flight.flightclass+"','"+booking.flight.bookingstartdate+"','"+booking.flight.bookingenddate+"');";

                      mysql.executeQuery(function(err){
                          if(err){
                                console.log(err);
                                res.code = "401";
                                res.value=" Error booking the flight";
                                callback(null, res);
                          }
                          else{
                                 res.code = "200";
                                 res.value = "One-Way Flight booked Successfully";
                                 callback(null, res);
                          }
                       },bookingSql);
                  }else{
                      res.code = 402;
                      res.value = "Flight is not available to book for current selections!";
                      callback(null, res);
                  }
            });

      }

      else{
           // Save the two way booking
           var returnBooking = getReturnBooking(booking);
           console.log('------Return Booking------');
           console.log(returnBooking);
           var isAvailable = checkFlightAvailable(booking.flight, returnBooking, function(isAvailable){
                 var res = {};
                 if(isAvailable == true){
                     console.log('Flight is Available!!');
                     totalPrice = booking.flight.price + booking.returnflight.price;
                     // Proceed to Booking
                    // TODO : Add credit card fields
                     var bookingSql="insert into BILLING(`user_email`,`target_id`,`booking_type`,`billing_amount`,`target_count`,`source_city`,`source_state`,`destination_city`,`destination_state`,`trip_type`,`booking_class`,`booking_start_date`,`booking_end_date`,`return_target_id`,`return_booking_start_date`,`return_booking_end_date`) values('"
                     +email+"','"+booking.flight.flightid+"','"+'FLIGHT'+"','"+ totalPrice +"','"+booking.flight.passengers+"','"+booking.flight.origincity+"','"+booking.flight.originstate+"','"+booking.flight.destinationcity+"','"+booking.flight.destinationstate+"','"+booking.flight.triptype+"','"
                     +booking.flight.flightclass+"','"+booking.flight.bookingstartdate+"','"+booking.flight.bookingenddate+"','"+booking.returnflight.returnflightid+"','"+booking.returnflight.returnstartdate+"','"+booking.returnflight.returnenddate+"');";

                     mysql.executeQuery(function(err){
                         if(err){
                               console.log(err);
                               res.code = "401";
                               res.value=" Error booking the flight";
                               callback(null, res);
                         }
                         else{
                                res.code = "200";
                                res.value = "Two - Way Flight booked Successfully";
                                callback(null, res);

                         }
                      },bookingSql);
                 }else{
                     console.log('Flight is Not Available!!');
                     res.code = 402;
                     res.value = "Flight is not available to book for current selections!";
                     callback(null, res);
                 }
           });
      }

}

function getReturnBooking(bookingObj){
      var booking = {};
      if(bookingObj != undefined){
          console.log('Making return booking object');
          booking.returnbookingstartdate = bookingObj.returnflight.returnstartdate;
          booking.returnbookingenddate = bookingObj.returnflight.returnenddate;
          booking.returnflightid = bookingObj.returnflight.returnflightid;
          booking.flightclass = bookingObj.returnflight.flightclass;
          booking.passengers = bookingObj.returnflight.passengers;
          booking.capacity = bookingObj.returnflight.capacity;
          console.log(booking);
      }
      return booking;
}

function checkFlightAvailable(booking, returnBooking, callback){

      console.log(booking);
      console.log(returnBooking);
      if(booking.triptype == 'One-Way'){

            getCurrentFlightBookingCount(booking, function(bookedCount){
                  var capacity = booking.capacity;
                  console.log("capacity is " + capacity);
                  var isAvailable = capacity - bookedCount >= booking.passengers;
                  if(isAvailable){
                        console.log(' One way Flight available for booking ' + booking.flightid);
                        callback(true);
                  }
                  else{
                        console.log(' Flight Booking Capacity reached for One way flight ' + booking.flightid);
                        callback(false);
                  }
            })


      }else{
            console.log('--------Booking is --------');
            console.log(booking);
            console.log('--------Return Booking is --------');
            console.log(returnBooking);
            getCurrentFlightBookingCount(booking, function(bookedCount){
                  var capacity = booking.capacity;
                  console.log("capacity for first side is " + capacity);
                  var isAvailable = capacity - bookedCount >= booking.passengers;
                  console.log("bookedCount for one side is " + bookedCount + " and capacity is " + capacity + " and availability is " + isAvailable);
                  if(isAvailable){
                        // Check Return Flight Availability
                        var capacity = returnBooking.capacity;
                        console.log("capacity for second side is " + capacity);
                        getCurrentFlightBookingCount(returnBooking, function(bookedCount){
                              var isAvailable = capacity - bookedCount >= returnBooking.passengers;
                              if(isAvailable){
                                    callback(true);
                              }
                              else{
                                    console.log(' Flight Booking Capacity reached for return flight ' + returnBooking.returnflightid);
                                    callback(false);
                              }
                        })
                  }else{
                        console.log(' Flight Booking Capacity reached for one side flight ' + booking.flightid);
                        callback(false);
                  }

            })

      }

}

// // Get the Selected Flight Capacity per class selected
// function getFlightCapacity(flights, booking){
//       console.log('Getting capacity for flight');
//       console.log(flights);
//       console.log(booking);
//       var classType = _.where(flights[0].class, {type: booking.flightclass});
//       console.log(flights[0].class + ' ' + booking.flightclass);
//       return classType[0].capacity;
// }

// Get the Flight Booking Count
function getCurrentFlightBookingCount(booking, callback){
      var res = {};
      var bookingCountQuery;
      if((booking.returnflightid != undefined) && (booking.returnbookingstartdate != undefined) && (booking.returnbookingenddate != undefined)){
              // Is return flight booking
              var startDate = booking.returnbookingstartdate;
              var endDate = booking.returnbookingenddate;
              bookingCountQuery = "select * from BILLING where return_target_id='" + booking.returnflightid + "' AND return_booking_start_date ='" + startDate + "'  AND return_booking_end_date ='" + endDate + "'";
      }else{
              // Is One way Booking
              var startDate = booking.bookingstartdate;
              var endDate = booking.bookingenddate;
              bookingCountQuery = "select * from BILLING where target_id='" + booking.flightid + "' AND booking_start_date ='" + startDate + "' AND booking_end_date ='" + endDate + "'";
      }
      mysql.fetchData(function (err,dbBookings) {

          if (err){
             callback(0);
          }
          else {
             callback(getBookedCountHelper(dbBookings));
          }

      } , bookingCountQuery);
}

// Get Flight booking Count Helper
function getBookedCountHelper(dbBookings){
      var count = 0;
          for(booking in dbBookings){
              count = count + dbBookings[booking].target_count;
          }
      console.log(" Total Seats Booked in the Current Flight are - " + count);
      return count;
}

exports.searchFlights=searchFlights;
exports.bookFlight=bookFlight;
