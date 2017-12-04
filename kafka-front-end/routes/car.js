var express = require('express');
var kafka = require('./kafka/client');
var search = require('./search');
var router = express.Router();

/* GET car list */
router.get('/cars', function (req, res) {

    var data = {'searchtype':'car', 'searchquery':req.query}
    search.searchFromApi(data, function (err, results) {

        if(err || !results){
            res.send({'status': 401});
        }
        else{

            res.send({'cars': results, 'status': 201});

        }
    });

});


router.get('/getcars', function (req, res) {

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
})



router.post('/book', function (req, res) {
    //console.log(req.body);
    var queueName = "BookCar";

    var reqObject = {
        email : req.session.email,
        booking : req.body.booking,
        credit_card : req.body.credit_card
    }

      //console.log(req.session.email);
    kafka.make_request(queueName, reqObject, function(err,results) {

        if (err) {
            console.log('Returning Error ----' + err);
            res.send({'status': err.code, 'message': err.message});
        }
        else {
            console.log('Returning results ----' + results);
            if (results.code == "200") {
                res.send({'status': results.code, 'api_results': results.value});
            }
            else {
                res.send({'status': results.code, 'api_results': results.value});
            }
        }
    })
});



router.post('/addcar', function (req, res) {
    console.log('Request is ---------');
    console.log(req.body);

    var reqObject = {
        email : "mmt@gmail.com",
        car : req.body
    }
    kafka.make_request("addcar", reqObject, function(err,results){

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



router.get('/getcarlist', function (req, res) {

    kafka.make_request("getcarlist",{'email': "mmt@gmail.com"}, function(err,results){

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

router.post('/deletecar', function (req, res) {
    console.log('Request is ---------');
    console.log(req.body);

    var reqObject = {
        email : "mmt@gmail.com",
        id : req.body.id
    }
    kafka.make_request("deletecar", reqObject, function(err,results){

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
