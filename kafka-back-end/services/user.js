

//var bcrypt = require('bcrypt');
var mysql = require('../models/mysql');





function login(msg, callback){

    var res = {};
    console.log("++++++++++++++++++++");
    console.log(msg);
    console.log("++++++++++++++++++++");
    var selectQuery = "select password from USER where email = '"+msg.email+"';" ;
    console.log(selectQuery);

    mysql.fetchData(function (err,results) {

        if (err){
           res.code = "401" ;
           res.value = "Username not valid";
        }
        else {
            console.log("++++++++++++++++++++");
            console.log(results[0].password);
            console.log("++++++++++++++++++++");
            if (results[0].password === msg.password) {
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
    console.log("------------");
    console.log(msg)
    console.log("------------");
    var insertQuery="insert into USER(email,password) values('"+msg.email+"','"+msg.password+"');";
    console.log(insertQuery);

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

exports.update = update ;
exports.register = register ;
exports.login = login;