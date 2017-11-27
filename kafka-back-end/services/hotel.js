
var mysql = require('../models/mysql');

// Search for all hotels on the basis of city, state and room type
function searchHotels(msg, callback){


    var hotel = require('../models/hotel/'+msg.vendor);

    var res = {};
    var city = msg.searchcriteria.city;
    var state = msg.searchcriteria.state;
    var roomtype = msg.searchcriteria.roomtype;

    hotel.find({'address.city': city, 'address.state': state, 'rooms.roomtype': roomtype }, function (err, hotels) {

        if (err) {
            throw err;
            console.log("Error in searching for hotels")
        }
        else {

            console.log("Hotel List:", hotels)
            res.code = "200";
            res.value = hotels;

            callback(null, res);
        }

    });
}

// Book the Hotel
function bookHotel(msg, callback){
      var booking = msg.booking;
      var email = "meenakshi.paryani@gmail.com"; //msg.email - TODO : uncomment this after stable

      console.log('-------booking is-------');
      console.log(booking);

      // Save the Hotel booking
      var isAvailable = checkHotelAvailable(booking, function(isAvailable){
            var res = {};
            if(isAvailable){
                // Proceed to Booking
                 // TODO : Add credit card fields
                var bookingSql="insert into BILLING(`user_email`,`target_id`,`target_name`,`booking_type`,`billing_amount`,`target_count`,`source_city`,`source_state`,`room_type`,`booking_start_date`,`booking_end_date`) values('"+
                email+"','"+booking.hotelid+"','"+ booking.name +"','"+ 'HOTEL' + "','"+booking.price+"','"+booking.roomcount+"','"+booking.address.city+"','"+booking.address.state+"','"+booking.roomtype + "','" + booking.bookingstartdate+"','"+booking.bookingenddate+ "');";

                mysql.executeQuery(function(err){
                    if(err){
                          console.log(err);
                          res.code = "401";
                          res.value=" Error booking the Hotel";
                          callback(null, res);
                    }
                    else{
                           res.code = "200";
                           res.value = "Hotel booked Successfully";
                           callback(null, res);
                    }
                 },bookingSql);
            }else{
                res.code = 402;
                res.value = "Hotel is not available to book for current selections!";
                callback(null, res);
            }
      });



}


function checkHotelAvailable(booking, callback){

      console.log(booking);
      getCurrentHotelBookingCount(booking, function(bookedCount){
              var capacity = booking.capacity;
              console.log("capacity is " + capacity);
              var isAvailable = capacity - bookedCount >= booking.roomcount;
              if(isAvailable){
                    console.log(' Hotel available for booking ' + booking.hotelid);
                    callback(true);
              }
              else{
                    console.log(' Booking Capacity reached for Hotel ' + booking.flightid + ' ' + booking.name);
                    callback(false);
              }
      })




}


// Get the Hotel Booking Count
function getCurrentHotelBookingCount(booking, callback){
      var res = {};
      var bookingCountQuery;
      var startDate = booking.bookingstartdate;
      var endDate = booking.bookingenddate;
      bookingCountQuery = "select * from BILLING where target_id='" + booking.hotelid + "' AND booking_start_date ='" + startDate + "' AND booking_end_date ='" + endDate + "'";

      mysql.fetchData(function (err,dbBookings) {

          if (err){
             callback(0);
          }
          else {
             callback(getBookedCountHelper(dbBookings));
          }

      } , bookingCountQuery);
}

// Get Hotel booking Count Helper
function getBookedCountHelper(dbBookings){
      var count = 0;
          for(booking in dbBookings){
              count = count + dbBookings[booking].target_count;
          }
      console.log(" Total Seats Booked in the Hotel are - " + count);
      return count;
}


exports.bookHotel=bookHotel;
exports.searchHotels=searchHotels;
