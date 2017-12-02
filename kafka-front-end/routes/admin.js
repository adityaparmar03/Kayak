var express = require('express');
var router = express.Router();
var passport = require('passport');
var kafka = require('./kafka/client');



router.get('/getallusers' , function(req,res){

    kafka.make_request('getallusers' ,null,function (err,results) {
        if(err){
            console.log(err);
            res.send({"status":401, "error": err});
        }
        else{

            if (results.code==="200"){
                console.log("after getting all users ");
                res.send({"status":201 , "data": results.data})
            }
            else{
                res.send({"status":401 , "data": results.value});
            }
        }

    })


})



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

    kafka.make_request('getvendors', "", function(err,results){

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



router.get('/bills',function (req,res) {

    kafka.make_request('getbills', "", function(err,results){

        if(err){
            console.log('Returning Error ----' , err);
            res.send({'status': err.code, 'message' : err.message});
        }
        else
        {
            console.log('Returning results ----' + results);
            if(results.code == "200"){
                res.send({'status': results.code, 'bills': results.value});
            }
            else {
                res.send({'status': results.code});
            }
        }
    })


})

/*

router.post('/updatebill' , function (req,res) {
    console.log(req.body);

    kafka.make_request('updatebill' , req.body , function (err) {
        if(err){
            console.log(err);
            res.send({"status":401, "error": err})
        }
        else{

            res.send({'status': results.code});
        }

    })

})



router.post('/deletebill' , function (req,res) {
    console.log(req.body);

    kafka.make_request('deletebill' , "" , function (err) {
        if(err){
            console.log(err);
            res.send({"status":401, "error": err})
        }
        else{

            res.send({'status': results.code});
        }

    })

})
*/

module.exports = router;
