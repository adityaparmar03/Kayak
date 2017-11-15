
var User = require('../models/User');
var bcrypt = require('bcrypt');


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
exports.login = login;