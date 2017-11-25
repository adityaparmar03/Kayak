

//var bcrypt = require('bcrypt');
var mysql = require('../models/mysql');





function login(msg, callback){

    var res = {};
    var selectQuery = "select password from USER where username = "+msg.email ;
    mysql.fetchData(function (err,password) {

        if (err){
           res.code = "401" ;
           res.value = "Username not valid";
        }
        else {
            if (password == msg.password) {
                res.code = "200";
                res.value = "User valid";
            }
            else{
                res.code = "402";
                res.value = "User password not valid";
            }
        }
        callback(null,res);
    } , selectQuery)

}



//****************************************************************************************************************************

function register(msg,callback){

    var res={};
    var insertQuery="insert into USER('email','password') values('"+msg.email+"','"+msg.password+"');";

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

//****************************************************************************************************************************

function update(msg,callback) {
    var res={};
    var updateQuery = "UPDATE USER SET email = ,first_name=\"\",last_name=\"\",street_address=\"\",city=\"\",state=\"\",zip_code=\"\" where email = msg.email";
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


//****************************************************************************************************************************


exports.register = register ;
exports.login = login;