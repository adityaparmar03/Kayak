var express = require('express');
var router = express.Router();
var passport = require('passport');
var kafka = require('./kafka/client');
var mail = require('./mail');




//************************************************************************************************************************

router.post('/login', function (req, res) {

     // var reqEmail = req.body.email;
     //  var reqPassword = req.body.password;
        console.log("inside the login path with the body"+req.body);

   passport.authenticate('login', function(err, user) {

        if (err) {
            throw err;
        }

        if(!user ){
            console.log('Could not find user');
            res.send({status: 401});
        }
        else {

            req.session.email = user.email;
            req.session.isloggedin = true;
            console.log(user.data);
            res.send({"status": 201, "email": user.email,"data":user.data});

        }

    })(req,res);

});

//************************************************************************************************************************

router.get('/checkSession', function (req, res) {

    // var reqEmail = req.body.email;
    //  var reqPassword = req.body.password;
   console.log(req.session);
   if(req.session.isloggedin){
       res.send({"status":201});
   }
   else {
       res.send({"status": 401});
   }
});

//************************************************************************************************************************


router.get('/bookinghistory', function (req, res) {

    // var reqEmail = req.body.email;
    //  var reqPassword = req.body.password;
    console.log("inside history path");
    var email = {"email": req.session.email};
     kafka.make_request('bookings' ,email, function (err, results) {
         if(err){
             console.log("Error occcured");
         }
         else{
             if(results.code==="200"){
                 console.log("Everything successfull");
                 res.send({"status":201 , "data": results})

             }
         }

     })



});

//************************************************************************************************************************

router.post('/register',function (req,res) {


    console.log(req.body);

    kafka.make_request('register', req.body ,function(err,results){

        if(err){
            console.log("After kafka response");

            res.send({"status":401})
        }
        else
        {
            if(results.code === "200"){
             mail.sendMail(req,res);

            }
            else {

                res.send({"status":401})
            }
        }
    })


})

//************************************************************************************************************************

router.put('/update',function (req,res) {

console.log("inside the update path");
    console.log(req.body);

    kafka.make_request('update', req.body ,function(err,results){

        if(err){
            console.log("After kafka response");
            done(err,{});
            res.send({"status":401})
        }
        else
        {
            if(results.code == 200){
               res.send({"status":201})

            }
            else {
                done(null,false);
                res.send({"status":401})
            }
        }
    })


})

//************************************************************************************************************************

//************************************************************************************************************************

router.delete('/delete',function (req,res) {

    console.log("inside the delete path");

   // console.log(req.query);
   // var email = { 'email':req.session.email };

    kafka.make_request('deleteuser', req.session ,function(err,results){

        if(err){
            console.log("After kafka response");
            res.send({"status":401})
        }
        else
        {
            console.log(results);
            if(results.code === "200"){

                res.send({"status":201 ,"data":results.value})

            }
            else {
                res.send({"status":401,"data":res.value});
            }
        }
    })


})

//************************************************************************************************************************

//Logout the user - invalidate the session
router.post('/logout', function (req, res) {

    req.session.destroy();
    console.log('Session destroyed');
    res.status(201).send();

});

//************************************************************************************************************************

module.exports = router;
