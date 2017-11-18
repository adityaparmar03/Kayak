var express = require('express');
var router = express.Router();
var passport = require('passport');
var kafka = require('./kafka/client');
var mail = require('./mail');




//************************************************************************************************************************

router.post('/login', function (req, res) {

     var reqEmail = req.body.email;
      var reqPassword = req.body.password;

   passport.authenticate('login', function(err, user) {

        if (err) {
            throw err;

        }

        if(!user ){
            console.log('Could not find user')
            res.send({status: 401});
        }
        else {

            req.session.email = user.email;
            res.send({"status": 201, "email": user.email});

        }

    })(req,res);

});

//************************************************************************************************************************

router.post('/register',function (req,res) {

    var body = {
       "reqEmail" : req.body.email,
       "reqPassword" : req.body.password,
       "reqFirstName": req.body.firstname,
       "reqLastName":req.body.lastname,
       "action": "register"

    }

    kafka.make_request('login', body ,function(err,results){

        if(err){
            console.log("After kafka response");
            done(err,{});
            res.send({"status":401})
        }
        else
        {
            if(results.code == 200){
            mail.sendMail(req,res);

            }
            else {
                done(null,false);
                res.send({"status":401})
            }
        }
    });


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
