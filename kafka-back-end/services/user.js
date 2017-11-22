
var User = require('../models/User');
var bcrypt = require('bcrypt');
var MMT = require('../models/MMT');
var cleartrip = require('../models/cleartrip');
function login(msg, callback){

    var res = {};
    var email=msg.email;
    var password=msg.password;


        User.findOne({'email': email}, function (err, user) {
            if(!user || !bcrypt.compareSync(password, user.password)){

                res.code = "401";
                res.value = "Failed Login";
                callback(null, res);
            }
            else {


                User.update({'email': email},{lastlogintime: new Date()}, function (err) {
                    if (err) {
                        throw err;
                        console.log("Error inserting last login....")
                    }
                    else {

                        console.log("last login inserted....")
                        res.code = "200";
                        res.value = "Success Login";

                        callback(null, res);
                    }
                });
            }
        });
}



//****************************************************************************************************************************

function register(msg,callback){

    var res={};
    var user = User();

    user.firstname = msg.firstname;
    user.lastname = msg.lastname;
    user.email = msg.email;
    user.password = msg.password;

    user.save(function (err) {
        if (err){
            console.log("Error while saving the data to the database");
            res.code = "401";
            res.value = "Failed registration";
        }

        else{
            console.log("User logged in succesully ");
            res.code = "200";
            res.value = "Success Registration";
            callback(null,res);
        }
    })


}

//****************************************************************************************************************************

// function registercar(msg,callback){
//
//     var res={};
//     var user = User();
//     var mmt = cleartrip();
//
//     mmt.cartype = "messarati";
//         mmt.dailyrent = "30";
//
//     mmt.save(function (err) {
//         if (err){
//             console.log("Error while saving the data to the database");
//             res.code = "401";
//             res.value = "Failed registration";
//             callback(null,res);
//         }
//
//         else{
//             console.log("User logged in succesully ");
//             res.code = "200";
//             res.value = "Success Registration";
//             callback(null,res);
//         }
//     })
//
//
// }

//the above function is used to add cars in their respective collections ... that is create a new collection


//****************************************************************************************************************************

//exports.registercar=registercar;
exports.register = register ;
exports.login = login;