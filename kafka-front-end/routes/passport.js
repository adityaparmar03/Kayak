var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function(passport) {

    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {

              var body = {
                  "email" : email,
                  "password": password,
                  "action" : "user"
              }
            kafka.make_request('login',body, function(err,results){

                if(err){
                    console.log("After kafka response if error")
                    done(err,{});
                }
                else
                {
                    if(results.code == 200){
                        console.log("After kafka response no error and everything fine")
                        done(null,{"email":email});
                    }
                    else {
                        console.log("After kafka response no error username not successfull")
                        done(null,false);
                    }
                }
            });
        }));
};


