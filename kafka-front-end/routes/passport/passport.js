// // config/passport.js
//
// // load all the things we need
// var LocalStrategy    = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy  = require('passport-twitter').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var kafka = require('../kafka');
//
// // load up the user model
// var User       = require('../app/models/user');
//
// // load the auth variables
// var configAuth = require('./auth');
//
// module.exports = function(passport) {
//
//     // used to serialize the user for the session
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });
//
//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });
//
//     // code for login (use('local-login', new LocalStategy))
//     // code for signup (use('local-signup', new LocalStategy))
//     // code for facebook (use('facebook', new FacebookStrategy))
//     // code for twitter (use('twitter', new TwitterStrategy))
//
//     // =========================================================================
//     // GOOGLE ==================================================================
//     // =========================================================================
//     passport.use(new GoogleStrategy({
//
//             clientID        : configAuth.googleAuth.clientID,
//             clientSecret    : configAuth.googleAuth.clientSecret,
//             callbackURL     : configAuth.googleAuth.callbackURL,
//
//         },
//         function(token, refreshToken, profile, done) {
//
//             // make the code asynchronous
//             // User.findOne won't fire until we have all our data back from Google
//             process.nextTick(function() {
//
//                 // try to find the user based on their google id
//
//                     var body = {
//                         email : profile.emails[0].value,
//                         action : "google_login",
//                         name : profile.displayName
//                     }
//                     console.log(profile.displayName);
//                 kafka.make_request('login',body, function(err,results){
//
//                     if(err){
//                         console.log("After kafka response if error")
//                         done(err,{});
//                     }
//                     else
//                     {
//                         if(results.code == 200){
//                             console.log("After kafka response no error and everything fine")
//                             done(null,{"email":email});
//                         }
//                         else {
//                             console.log("After kafka response no error username not successfull")
//                             done(null,false);
//                         }
//                     }
//                 });
//
//
//                 // User.findOne({ 'google.id' : profile.id }, function(err, user) {
//                 //     if (err)
//                 //         return done(err);
//                 //
//                 //     if (user) {
//                 //
//                 //         // if a user is found, log them in
//                 //         return done(null, user);
//                 //     } else {
//                 //         // if the user isnt in our database, create a new user
//                 //         var newUser          = new User();
//                 //
//                 //         // set all of the relevant information
//                 //         newUser.google.id    = profile.id;
//                 //         newUser.google.token = token;
//                 //         newUser.google.name  = profile.displayName;
//                 //         newUser.google.email = profile.emails[0].value; // pull the first email
//                 //
//                 //         // save the user
//                 //         newUser.save(function(err) {
//                 //             if (err)
//                 //                 throw err;
//                 //             return done(null, newUser);
//                 //         });
//                 //     }
//                 // });
//             });
//
//         }));
//
// };
