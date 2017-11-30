var mysql = require('../models/mysql');

// Search for all car on the basis of city, state and trip type
function searchCars(msg, callback){

    var car = require('../models/car/'+msg.vendor);

    var res = {}
     var pickupcity = msg.searchcriteria.pickupcity;
     var pickupstate = msg.searchcriteria.pickupstate;
     var dropoffcity = msg.searchcriteria.dropoffcity;
     var dropoffstate = msg.searchcriteria.dropoffstate;
   //  var triptype = msg.searchcriteria.triptype;

  //  if(triptype=='One-Way'){

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
  //  }
/*

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
*/

}

// Book the Car
function bookCar(msg, callback){
      var booking = msg.booking;
      var email = msg.email;
      var creditCard = msg.credit_card;
      console.log('-------booking is-------');
      console.log(booking);

      // Save the Hotel booking
      var isAvailable = checkCarAvailable(booking, function(isAvailable){
            var res = {};
            if(isAvailable){
                // Proceed to Booking
                 // TODO : Add credit card fields
                var bookingSql="insert into BILLING(`user_email`,`target_id`,`target_name`,`car_type`,`booking_type`,`billing_amount`,`source_city`,`source_state`,`source_street`,`source_country`,`destination_city`,`destination_state`,`destination_street`,`destination_country`,`car_trip_type`,`booking_start_date`,`booking_end_date`,`credit_card_type`, `credit_card_number`, `credit_card_holder_name`,`credit_card_valid_from`,`credit_card_valid_till`) values('"+
                email+"','"+booking.carId+"','"+ booking.carmodel+"','"+ booking.cartype +"','"+ 'CAR' + "','"+booking.price+"','"+booking.pickupaddress.city+"','"+booking.pickupaddress.state+"','"+booking.pickupaddress.street+"','"+booking.pickupaddress.country+"','"+booking.dropoffaddress.city
                +"','"+booking.dropoffaddress.state+"','"+booking.dropoffaddress.street+"','"+booking.dropoffaddress.country+"','"+booking.triptype + "','" + booking.pickupdate
                +"','"+booking.dropoffdate+ "','"+creditCard.card_type+"','"+creditCard.card_number+"','"+creditCard.card_holder_name+"','"+creditCard.valid_from+"','"+creditCard.valid_till+"');";

               // console.log("*************************************************");
               // console.log(bookingSql);
               // console.log("*************************************************");

                mysql.executeQuery(function(err){
                    if(err){
                          console.log(err);
                          res.code = "401";
                          res.value=" Error booking the car";
                          callback(null, res);
                    }
                    else{
                           res.code = "200";
                           res.value = "car booked Successfully";
                           callback(null, res);
                    }
                 },bookingSql);
            }else{
                res.code = 402;
                res.value = "car is not available to book for current selections!";
                callback(null, res);
            }
      });



}


function checkCarAvailable(booking, callback){

      console.log(booking);
      getCurrentCarBookingStatus(booking, function(bookedCount){

              var isAvailable = bookedCount <= 0;
              if(isAvailable){
                    console.log(' Car available for booking ' + booking.carId);
                    callback(true);
              }
              else{
                    console.log(' Booking Capacity reached for Car ' + booking.carId + ' ' + booking.carmodel);
                    callback(false);
              }
      })


}


// Get the Car Booking Status
function getCurrentCarBookingStatus(booking, callback){
      var res = {};
      var bookingCountQuery;
      var startDate = booking.pickupdate;
      var endDate = booking.dropoffdate;
      bookingCountQuery = "select * from BILLING where target_id='" + booking.carId + "' AND booking_start_date between '" + startDate + "' AND '" + endDate + "'";

      mysql.fetchData(function (err,dbBookings) {

          if (err){
             callback(0);
          }
          else {
              console.log("inside getcurrentcarbookingstatus");
             callback(getBookedCountHelper(dbBookings));
          }

      } , bookingCountQuery);
}

// Get Car booking Count Helper
function getBookedCountHelper(dbBookings){
      var count = 0;

          for(booking in dbBookings){
              count = count + 1;
          }
      console.log(" Total Car booking count - " + count);
      return count;
}


exports.bookCar=bookCar;
exports.searchCars = searchCars;
