var express = require('express');
var router = express.Router();
var passport = require('passport');
var kafka = require('./kafka/client');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kayak.cmpe273@gmail.com',
        pass: 'kayak_cmpe273'
    }
});



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

                var mailOptions = {
                    from: 'kayak.cmpe273@gmail.com',
                    to: req.body.email,
                    subject: 'Sending Email using Node.js',
                    html: '<h1>Welcome :</h1><p>you have registered to the kayak application : CMPE273 rocks!</p>'
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send({"status" : 201, "email": req.body.email })
                    }
                });



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
