var express = require('express');
var router = express.Router();
var passport = require('passport');
var kafka = require('./kafka/client');


// router.post('/login', function (req, res) {
//
//     var reqEmail = req.body.email;
//     var reqPassword = req.body.password;
//
//    passport.authenticate('login', function(err, user) {
//
//         if (err) {
//             throw err;
//
//         }
//
//         if(!user ){
//             console.log('Could not find user')
//             res.send({status: 401});
//         }
//         else {
//
//             req.session.email = user.email;
//             res.send({"status": 201, "email": user.email});
//
//         }
//
//     })(req,res);
//
// });
//
// //Logout the user - invalidate the session
// router.post('/logout', function (req, res) {
//
//     req.session.destroy();
//     console.log('Session destroyed');
//     res.status(201).send();
//
// });

// router.get('/getapi' , function (req, res) {
//
//     //console.log(req.body);
//
//     kafka.make_request('getapi', function (err, results) {
//
//         if (err) {
//             console.log("After kafka response if error")
//             res.status(401).send("Error while fetching the data")
//         }
//         else {
//             if (results.code == 200) {
//                 console.log("After kafka response no error and everything fine")
//                 res.status(200).send("yo ! you got the data");
//             }
//             else {
//                 console.log("After kafka response no error username not successfull")
//                 res.status(401).send("response from kafka successfull but not 200 ");
//             }
//         }
//
//
//     })
//
// })


router.post('/addvendor',function (req,res) {


    console.log(req.body);

    kafka.make_request('addvendor', req.body, function(err,results){

        if(err){
            console.log('Returning Error ----' , err);
            res.send({'status': err.code, 'message' : err.message});
        }
        else
        {
            console.log('Returning results ----' + results);
            if(results.code == "200"){
                res.send({'status': results.code});
            }
            else {
                res.send({'status': results.code});
            }
        }
    })


})


router.post('/deletevendor',function (req,res) {


    console.log(req.body);

    kafka.make_request('deletevendor', req.body, function(err,results){

        if(err){
            console.log('Returning Error ----' , err);
            res.send({'status': err.code, 'message' : err.message});
        }
        else
        {
            console.log('Returning results ----' + results);
            if(results.code == "200"){
                res.send({'status': results.code});
            }
            else {
                res.send({'status': results.code});
            }
        }
    })


})


router.get('/vendors',function (req,res) {


    console.log(req.body);

    kafka.make_request('getvendors', req.body, function(err,results){

        if(err){
            console.log('Returning Error ----' , err);
            res.send({'status': err.code, 'message' : err.message});
        }
        else
        {
            console.log('Returning results ----' + results);
            if(results.code == "200"){
                res.send({'status': results.code, 'vendors': results.value});
            }
            else {
                res.send({'status': results.code});
            }
        }
    })


})


router.post('/updatebilling' , function (req,res) {
    console.log(req.body);

    kafka.make_request('updatebilling' , req.body , function (err) {
        if(err){
            console.log(err);
            res.send({"status":401, "error": err})
        }
        else{
            console.log("No error the info was updated");
            res.send({"status":201 , "msg": "The info was updated "})
        }

    })

})
module.exports = router;
