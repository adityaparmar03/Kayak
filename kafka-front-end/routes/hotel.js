var express = require('express');
var kafka = require('./kafka/client');
var search = require('./search');
var router = express.Router();

/* GET car list */
router.get('/hotels', function (req, res) {

    console.log("Inside Hotels");
    var data = {'searchtype':'hotel', 'searchquery':req.query}
    search.searchFromApi(data, function (err, results) {

        if(err || !results){
            res.send({'status': 401});
        }
        else{

            res.send({'hotels': results, 'status': 201});
        }
    });

});

router.get('/gethotels', function (req, res) {

    console.log("In gethotels");
    var searchcriteria=JSON.parse(req.query.data)

    var vendor = req.query.vendor ;

    var data={'vendor':vendor, 'searchcriteria':searchcriteria}

    kafka.make_request(vendor,data, function(err,results){

        if(err){
            res.send({'status': 401});
        }
        else
        {
            if(results.code == "200"){
                res.send({'status': 200 , 'api_results' : results.value});
            }
            else {
                res.send({'status': 401});
            }
        }
    })
});

router.post('/book', function (req, res) {
    console.log(req.body);
    var queueName = "BookHotel";

    console.log('Request is ---------');
    console.log(req.body);

    console.log('Session is ---------');
    console.log(req.session);

    var reqObject = {
        email : req.session.email,
        booking : req.body.booking,
        credit_card : req.body.credit_card
    }
    kafka.make_request(queueName, reqObject, function(err,results){

        if(err){
            console.log('Returning Error ----' + err);
            res.send({'status': err.code, 'message' : err.message});
        }
        else
        {
            console.log('Returning results ----' + results);
            if(results.code == "200"){
                res.send({'status': results.code , 'api_results' : results.value});
            }
            else {
                res.send({'status': results.code , 'api_results' : results.value});
            }
        }
    })
});



router.post('/addhotel', function (req, res) {
    console.log('Request is ---------');
    console.log(req.body);

    var reqObject = {
        email : "mmt@gmail.com",
        hotel : req.body
    }
    kafka.make_request("addhotel", reqObject, function(err,results){

        if(err){
            console.log('Returning Error ----' + err);
            res.send({'status': err.code, 'message' : err.message});
        }
        else
        {
            console.log('Returning results ----' + results);
            if(results.code == "200"){
                res.send({'status': results.code });
            }
            else {
                res.send({'status': results.code });
            }
        }
    })
});


router.get('/gethotellist', function (req, res) {

    kafka.make_request("gethotellist",{'email': "mmt@gmail.com"}, function(err,results){

        if(err){
            res.send({'status': 401});
        }
        else
        {
            if(results.code == "200"){
                res.send({'status': 200 , 'api_results' : results.value});
            }
            else {
                res.send({'status': 401});
            }
        }
    })
});

router.post('/deletehotel', function (req, res) {
    console.log('Request is ---------');
    console.log(req.body);

    var reqObject = {
        email : "mmt@gmail.com",
        id : req.body.id
    }
    kafka.make_request("deletehotel", reqObject, function(err,results){

        if(err){
            console.log('Returning Error ----' + err);
            res.send({'status': err.code, 'message' : err.message});
        }
        else
        {
            console.log('Returning results ----' + results);
            if(results.code == "200"){
                res.send({'status': results.code });
            }
            else {
                res.send({'status': results.code });
            }
        }
    })
});


module.exports = router;
