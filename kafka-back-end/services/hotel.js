
var mysql = require('../models/mysql');
var ObjectId = require('mongodb').ObjectId;


// Search for all hotels on the basis of city, state and room type
function searchHotels(msg, callback){


    var hotel = require('../models/hotel/'+msg.vendor);

    var res = {};
    var city = msg.searchcriteria.city;
    var state = msg.searchcriteria.state;
  //  var occupancy = Number(msg.searchcriteria.occupancy);

    var search = hotel.find({'address.city': city, 'address.state': state });
    search.lean()
    search.exec(function (err, hotels) {

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

      var email = msg.email ; //- TODO : uncomment this after stable

      var creditCard = msg.credit_card;
      var email = msg.email;


      console.log('-------booking is-------');
      console.log(booking);

      // Save the Hotel booking
      var isAvailable = checkHotelAvailable(booking, function(isAvailable){
            var res = {};
            if(isAvailable){
                // Proceed to Booking
                 // TODO : Add credit card fields
                var bookingSql="insert into BILLING(`user_email`,`target_id`,`target_name`,`booking_type`,`billing_amount`,`target_count`,`source_city`,`source_state`,`source_street`,`source_country`,`source_zipcode`,`room_type`,`booking_start_date`,`booking_end_date`,`credit_card_type`, `credit_card_number`, `credit_card_holder_name`,`credit_card_valid_from`,`credit_card_valid_till`) values('"+
                email+"','"+booking.hotelId+"','"+ booking.name +"','"+ 'HOTEL' + "','"+booking.price+"','"+booking.roomcount+"','"
                +booking.address.city+"','"+booking.address.state+"','"+booking.address.street+"','"+booking.address.country+"','"
                +booking.address.zip+"','"+booking.roomtype + "','" + booking.bookingstartdate+"','"+booking.bookingenddate+ "','"
                +creditCard.card_type+"','"+creditCard.card_number+"','"+creditCard.card_holder_name+"','"+creditCard.valid_from+"','"+creditCard.valid_till+"');";

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
                    console.log(' Hotel available for booking ' + booking.hotelId);
                    callback(true);
              }
              else{
                    console.log(' Booking Capacity reached for Hotel ' + booking.hotelId + ' ' + booking.name);
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
      bookingCountQuery = "select * from BILLING where target_id='" + booking.hotelId + "' AND booking_start_date between '" + startDate + "' AND '" + endDate + "'";

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
      console.log(" Total Seats Booked in the Hotel are - " + count);
      return count;
}



function addHotel(msg, callback) {

    var getModel="select model from vendors where servicetype='hotel' and email="+"'"+msg.email+"'";
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            console.log(results);
            if(results.length > 0){


                var hotel = require('../models/hotel/' + results[0].model);


                var newhotel = new hotel();

                    newhotel.hotelId = msg.hotel.hotelId;
                    newhotel.name = msg.hotel.name;
                    newhotel.description = msg.hotel.description;
                    newhotel.address=msg.hotel.address;
                    newhotel.stars = msg.hotel.stars;
                    newhotel.reviews =msg.hotel.reviews;
                    newhotel.rating = msg.hotel.rating;
                    newhotel.rooms =msg.hotel.rooms;
                    newhotel.imageurl = msg.hotel.imageurl;

                var res = {};

                newhotel.save(function (err) {

                    if (err) {
                        console.log(err)
                        res.code = "401";

                    }
                    else {

                        res.code = "200";

                        callback(null, res);
                    }
                });
            }
            else {
                res.code = "401";

                callback(null, res);
            }
        }
    },getModel);


}



function getHotelList(msg, callback) {

    var getModel="select model from vendors where servicetype='hotel' and email="+"'"+msg.email+"'";
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            console.log(results);
            if(results.length > 0){


                var hotel = require('../models/hotel/' + results[0].model);


                var res = {};
                hotel.find(function (err, hotels) {

                    if(err){
                        console.log("Error");
                    }
                    else{

                        console.log("Hotel List:", hotels)
                        res.code = "200";
                        res.value = hotels;
                        callback(null, res);

                    }
                });

            }
            else {
                res.code = "401";

                callback(null, res);
            }
        }
    },getModel);


}



function deleteHotel(msg, callback) {

    var getModel="select model from vendors where servicetype='hotel' and email="+"'"+msg.email+"'";
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            var res = {};
            console.log(results);
            if(results.length > 0){


                var hotel = require('../models/hotel/' + results[0].model);



                hotel.remove({'_id':new ObjectId(msg.id)},function (err, hotels) {

                    if(err){
                        console.log("Error");
                    }
                    else{


                        res.code = "200";
                        res.value = hotels;
                        callback(null, res);

                    }
                });

            }
            else {
                res.code = "401";

                callback(null, res);
            }
        }
    },getModel);


}


exports.getHotelList=getHotelList;
exports.deleteHotel=deleteHotel;
exports.addHotel=addHotel;
exports.bookHotel=bookHotel;
exports.searchHotels=searchHotels;
