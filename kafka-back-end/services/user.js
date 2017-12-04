

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
    var selectQuery = "select password, user_role from USER where email = '"+msg.email+"';" ;
    console.log(selectQuery);

    mysql.fetchData(function (err,results) {

        if (err){
            res.code = "401" ;
            res.value = "Username not valid";
        }
        else {
            //console.log("++++++++++++++++++++");
            // console.log(results[0].password);
            if (results.length > 0) {
                if (results[0].password == reqPassword) {

                    res.code = "200";
                    res.value = "Login success";
                    res.data = results[0].user_role;
                }
                else {
                    res.code = "402";
                    res.value = "User password not valid";
                    //  res.data = null;
                }

            }
            else {
                res.code = "401",
                    res.value = "User not found"
            }
            callback(null, res);
        }
    } , selectQuery)

}



//****************************************************************************************************************************

function register(msg,callback){

    var reqPassword = saltHashPassword(msg.password);
    var res={};
    console.log("------------");
    console.log(msg)
    console.log("------------");
    if(!msg.role)
        msg.role="USER"
    else
        msg.role;
    var insertQuery="insert into USER(email,password,user_role) values('"+msg.email+"','"+reqPassword+"','"+msg.role+"')";
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
    var updateBilling = "update billing set user_email='"+msg.email+"'where user_email='"+msg.user_email+"';";
    var foreignKey="SET foreign_key_checks = 0;"


    mysql.executeQuery(function (err) {
        if(err){
            throw err;
            res.code = "401";
            res.value="error";
        }
        else{
            console.log("executed the set foreign key query");
            console.log("+++++++++++++++++++");
            mysql.executeQuery(function(err){
                if(err){
                    throw err;
                    res.code = "401";
                    res.value=" Error Occured while registering ";
                }
                else{
                    console.log("executed the set billing key query");
                    console.log("+++++++++++++++++++");
                    var updateQuery = "update user set email='"+msg.email+"', first_name='"+msg.firstname+"', last_name='"+msg.lastname+"',street_address='"+msg.address+"'," +
                        "phone='"+msg.phonenumber+"',profile_image_path='"+msg.imgpath+"',credit_card_number='"+msg.creditcard+"',zip_code='"+msg.zipcode+"' where email='"+msg.user_email+"';";

                    mysql.executeQuery(function(err){
                        if(err) {
                            throw err;
                            res.code = "401";
                            res.value=" Error Occured while registering ";
                        }
                        else{
                            res.code = "200";
                            res.value = "User successfully registered";
                        }callback(null,res);

                    },updateQuery)
                }
            },updateBilling);
        }
    },foreignKey)




}


//****************************************************************************************************************************

function bookinghistory(msg,callback){
    var res={};
    console.log(msg);
    var car = [];
    var flight = [];
    var hotel = [];
    var search = "select * from billing where user_email='"+msg.email+"';" ;

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
                    if(results[i].booking_type == "CAR"){

                        car.push(results[i]);
                        console.log(car);

                    }


                    else if(results[i].booking_type == "FLIGHT"){
                        // es.flight = results[i];
                        console.log("**********");
                        console.log(results[i]);
                        console.log("**********");
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


function upload(msg,callback){
    var res= {};
    console.log(msg);
    var getQuery = "update user set profile_image_path = '"+msg.imgpath+"' where email='"+msg.email+"';";
    mysql.fetchData(function (err,results) {
        if(err){
            res.code = "401";
            res.value = "Error while fetching the user ";
        }
        else{
            console.log("inside the else of the get data");
            res.code = "200";
            res.value = "succesfully fetched the data";
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            console.log(results);
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            res.data = results;

        }callback(null,res);
    },getQuery);

}



//**************************************************************************************************************************

function getuserdata(msg,callback){
    var res= {};
   
    console.log(msg);
    var getQuery = "select first_name,last_name,user_role,city,state,zip_code,profile_image_path,email,phone,street_address,credit_card_number,email from user where email='"+msg.email+"';";
    mysql.fetchData(function (err,results) {
        if(err){
            res.code = "401";
            res.value = "Error while fetching the user ";
        }
        else{
            console.log("inside the else of the get data");
            res.code = "200";
            res.value = "user data success fully fetched";
            res.data=results;
            console.log("*********************");
            console.log(results)
            console.log("*********************");
        }callback(null,res);
    },getQuery);

}

//****************************************************************************************************************************
function deleteuser(msg,callback) {
    var res = {};
   
    if(msg!=undefined){
        var delquery = "delete from billing where user_email='"+msg+"';";
        
            mysql.executeQuery(function(err){
                if(err){
                    throw err;
                    res.code = "401";
                    res.value=" Error Occured while deleting from the billing table ";
                    callback(null,res);
                }
                else{
        
                    console.log("User succesfully deleted from the user table");
                    var deluser = "delete from user where email='"+msg+"';";
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
    }else{
        res.code = "401";
        res.value = "error while deleting the user from the user table";
        callback(null,res);

    }
    

}





function addHistory(msg, callback) {

    var startdate = new Date(msg.payload.startdate);
    var enddate = new Date(msg.payload.enddate);

    var res={};
    if(msg.payload.searchtype=="flight") {
        var historySql = "insert into searchhistory(`user_email`,`search_type`,`source_city`,`source_state`,`destination_city`,`destination_state`,`flight_trip_type`,`start_date`,`end_date`) values('"
            + msg.email + "','" + 'FLIGHT' + "','" + msg.payload.origincity + "','" + msg.payload.originstate + "','" + msg.payload.destinationcity + "','" + msg.payload.destinationstate + "','"
            + msg.payload.triptype + "','" + startdate + "','" + enddate + "');";
    }

    else if(msg.payload.searchtype=="hotel") {
        var historySql = "insert into searchhistory(`user_email`,`search_type`,`source_city`,`source_state`,`start_date`,`end_date`) values('"
            + msg.email + "','" + 'HOTEL' + "','" + msg.payload.city + "','" + msg.payload.state + "','"
             + startdate + "','" + enddate + "');";

    }

    else {
        var historySql = "insert into searchhistory(`user_email`,`search_type`,`source_city`,`source_state`,`destination_city`,`destination_state`,`start_date`,`end_date`) values('"
            + msg.email + "','" + 'CAR' + "','" + msg.payload.pickupcity + "','" + msg.payload.pickupstate + "','" + msg.payload.dropoffcity + "','" + msg.payload.dropoffstate
            + "','" + startdate + "','" +enddate + "');";

    }
    mysql.executeQuery(function(err){
        if(err){
            //throw  err;
            res.code = "401";

        }
        else{
            res.code = "200";

        }
        callback(null,res);
    },historySql);
}



function searchHistory(msg,callback){
    var res={};
    console.log(msg);
    var car = [];
    var flight = [];
    var hotel = [];
    var search = "select * from searchhistory where user_email='"+msg+"';" ;

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
                    if(results[i].search_type == "CAR"){

                        car.push(results[i]);
                        console.log(car);

                    }


                    else if(results[i].search_type == "FLIGHT"){
                        // es.flight = results[i];
                        console.log("**********");
                        console.log(results[i]);
                        console.log("**********");
                        flight.push(results[i]);

                    }
                    else if(results[i].search_type === "HOTEL"){
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
exports.upload = upload;
exports.searchHistory = searchHistory;
exports.addHistory = addHistory;
exports.getuserdata = getuserdata;
exports.deleteuser = deleteuser;
exports.bookinghistory = bookinghistory;
exports.update = update ;
exports.register = register ;
exports.login = login;