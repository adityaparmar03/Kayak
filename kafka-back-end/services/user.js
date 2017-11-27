

//var bcrypt = require('bcrypt');
var mysql = require('../models/mysql');





function login(msg, callback){

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
               console.log(results);
            console.log("++++++++++++++++++++");
            //if (results[0].password === msg.password) {
            if(true){
                res.code = "200";
                res.value = "User valid";
                res.data = results;
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

    var res={};
    console.log("------------");
    console.log(msg)
    console.log("------------");
    var insertQuery="insert into USER(email,password,user_role) values('"+msg.email+"','"+msg.password+"','USER');";
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