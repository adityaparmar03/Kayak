
var Hotel = require('../models/Hotel');

// Search for all hotels on the basis of city, state and room type
function searchHotels(msg, callback){

    var res = {};
    var city = msg.searchcriteria.city;
    var state = msg.searchcriteria.state;
    var roomtype = msg.searchcriteria.roomtype;

    Hotel.find({'city': city, 'state': state, 'rooms.roomtype': roomtype }, function (err, hotels) {

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

