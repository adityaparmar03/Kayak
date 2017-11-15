var express = require('express');
var router = express.Router();
var passport = require('passport');
var kafka = require('./kafka/client');


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

//Logout the user - invalidate the session
router.post('/logout', function (req, res) {

    req.session.destroy();
    console.log('Session destroyed');
    res.status(201).send();

});

module.exports = router;
