var express = require('express');
var kafka = require('./kafka/client');
var search = require('./search');
var router = express.Router();

/* GET flight list */
router.get('/flights', function (req, res) {

    var data = {'searchtype':'flight', 'searchquery':req.query}

    search.searchFromApi(data, function (err, results) {

        if(err || !results){
            res.send({'status': 401});
        }
        res.send({'flights': results, 'status': 201});
    });

});

router.get('/getflights', function (req, res) {

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
    var queueName = "BookFlight";

    var reqObject = {
      email : req.session.email,
      booking : req.body.booking
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



module.exports = router;
