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

            kafka.make_request('login',{"email":email,"password":password}, function(err,results){

                if(err){
                    done(err,{});
                }
                else
                {
                    if(results.code == 200){
                        done(null,{"email":email});
                    }
                    else {
                        done(null,false);
                    }
                }
            });
        }));
};


