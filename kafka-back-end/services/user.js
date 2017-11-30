

//var bcrypt = require('bcrypt');
var mysql = require('../models/mysql');
var crypto = require('crypto');
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
    return passwordData;
}





function login(msg, callback){
    var reqPassword = saltHashPassword(msg.password);
    var res = {};
    console.log("++++++++++++++++++++");
    console.log(msg);
    console.log("++++++++++++++++++++");
    var selectQuery = "select password,user_role from USER where email = '"+msg.email+"';" ;
    console.log(selectQuery);

    mysql.fetchData(function (err,results) {

        if (err){
           res.code = "401" ;
           res.value = "Username not valid";
        }
        else {
            console.log("++++++++++++++++++++");
               console.log(results[0].password);
               console.log("1234");
               console.log(reqPassword);
            console.log("++++++++++++++++++++");

            if (results[0].password == reqPassword) {

                res.code = "200";
                res.value = "User valid";
                res.data = results[0].user_role;
            }
            else{
                res.code = "402";
                res.value = "User password not valid";
                res.data = null;
            }
        }
        callback(null,res);
    } , selectQuery)

}



//****************************************************************************************************************************

function register(msg,callback){

    var reqPassword = saltHashPassword(msg.password);
    var res={};
    console.log("------------");
    console.log(msg)
    console.log("------------");
    var insertQuery="insert into USER(email,password,user_role) values('"+msg.email+"','"+reqPassword+"','USER');";
    console.log(insertQuery);
    var selectQuery = "select email from user where email='"+msg.email+"';";

    mysql.fetchData(function (err,results) {
        if(err){
            res.code = "401";
            res.value = "cannot fetch the user query";
            callback(null,res);
        }
        else{
            console.log("inside here else of finding a user");
            if(results.length>0){
                res.code=401;
                res.value = "user already exists";
                callback(null,res);

            }
            else{
                console.log("inside else so there are no users")
                mysql.executeQuery(function(err){
                    if(err){
                        throw err;
                        res.code = "401";
                        res.value=" Error Occured while registering ";
                    }
                    else{

                        res.code = "200";
                        res.value = "User successfully registered";

                    }callback(null,res);
                },insertQuery);
            }
        }

    },selectQuery)



}

//****************************************************************************************************************************

function update(msg,callback) {
    var res={};
    console.log(msg);
    var updateQuery = "update user set password='"+msg.password+"' where email='"+msg.email+"';";
    mysql.executeQuery(function(err){
        if(err){
            throw err;
            res.code = "401";
            res.value=" Error Occured while registering ";
        }
        else{

            res.code = "200";
            res.value = "User successfully registered";

        }callback(null,res);
    },updateQuery);

}


//****************************************************************************************************************************

function bookinghistory(msg,callback){
    var res={};
    console.log(msg);
    var car = [];
    var flight = [];
    var hotel = [];
    var search = "select booking_type,billing_amount,flight_trip_type,car_trip_type,room_type,billing_amount,billing_date,source_city,destination_city,booking_class from billing where user_email='"+msg.email+"';" ;

    mysql.fetchData(function (err,results) {
        if(err){
            throw err;
            res.code = "401";
            res.value = " error while fetching the data";
        }
        else{
            if(results.length>0) {
                res.code = "200";
                res.value = "Data successfully fetched";
                var i ;
                for (i = 0 ; i < results.length ; i++ ){
                    if(results[i].booking_type === "CAR"){
                            console.log("#############");
                            console.log(results[i]);
                            console.log("#############");
                        car.push(results[i]);
                        console.log(car);

                    }
                    else if(results[i].booking_type === "FLIGHT"){
                        //res.flight = results[i];
                        flight.push(results[i]);

                    }
                    else if(results[i].booking_type === "HOTEL"){
                       hotel.push(results[i]);
                    }
                }
                res.car = car;
                res.flight = flight;
                res.hotel =hotel;
            }

            else{
                res.code = 401;
                res.value = "No bookings found for the user";
            }
        }
        callback(null,res);
    },search)


}

//****************************************************************************************************************************

function getuserdata(msg,callback){
    var res= {};
    console.log(msg);
    var getQuery = "select first_name,last_name,user_role,city,state,zip_code,profile_image_path,email,phone from user where email='"+msg.email+"';";
    mysql.fetchData(function (err,results) {
        if(err){
            res.code = "401";
            res.value = "Error while fetching the user ";
        }
        else{
            console.log("inside the else of the get data");
            res.code = "200";
            res.value = "succesfully fetched the data";
            res.data = results;

        }callback(null,res);
    },getQuery);

}



//****************************************************************************************************************************
function deleteuser(msg,callback) {
    var res = {};
    console.log(msg);

    var delquery = "delete from billing where user_email='"+msg.email+"';";

    mysql.executeQuery(function(err){
        if(err){
            throw err;
            res.code = "401";
            res.value=" Error Occured while deleting from the billing table ";
            callback(null,res);
        }
        else{

            console.log("User succesfully deleted from the user table");
            var deluser = "delete from user where email='"+msg.email+"';";
            mysql.executeQuery(function (err) {
                if(err){
                    //throw  err;
                    res.code = "401";
                    res.value = "error while deleting the user from the user table";

                }
                else{
                    res.code = "200";
                    res.value = 'user deleted from both the user table and the billing table';

                }callback(null,res);

            },deluser);


        }
    },delquery);

}




//****************************************************************************************************************************

exports.getuserdata = getuserdata;
exports.deleteuser = deleteuser;
exports.bookinghistory = bookinghistory;
exports.update = update ;
exports.register = register ;
exports.login = login;