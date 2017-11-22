var express = require('express');
var kafka = require('./kafka/client');
var router = express.Router();
var axios = require('axios');

/* GET car list */

router.get('/cars', function (req, res) {
    var car_results = [];
    var count = 0 ;
    kafka.make_request('getapi',"abc", function(err,results){

        console.log('in result');

        if(err){
            res.send({'status': 401});
        }
        else
        {
            if(results.code == "200"){
                var arr=results.value;
                console.log("initial value of cars_results", car_results);
                for (var i = 0 ; i < arr.length ; i++){

                    axios.get(arr[i].vendorapi).then(function(response) {
                         car_results.push.apply(car_results,response.data.cars);
                         count = count+1;
                         console.log("car results after "+ i + " push",car_results)
                        if(count === arr.length ) {
                            res.send({'cars': car_results, 'status': 201});
                        }

                }).catch(function(error) {
                        console.log(error);
                });

                }

            }
            else {
                res.send({'status': 401});
            }

        }


    });

});

router.get('/getcars', function (req, res) {
    var vendor = req.query.vendor ;
    console.log(vendor);
    kafka.make_request(vendor,vendor, function(err,results){
        
        if(err){
            res.send({'status': 401});
        }
        else
        {
            if(results.code == "200"){
                res.send({'status': 200 , 'cars' : results.value});
            }
            else {
                res.send({'status': 401});
            }
        }
    })


})



module.exports = router;

