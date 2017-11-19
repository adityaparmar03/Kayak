var express = require('express');
var kafka = require('./kafka/client');
var router = express.Router();

/* GET car list */
router.get('/cars', function (req, res) {

    kafka.make_request('searchcars',{"searchcriteria":req.query}, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.send({'status': 401});
        }
        else
        {
            if(results.code == 200){
                console.log(results.value)
                res.send({'cars': results.value, 'status': 201});
            }
            else {
                res.send({'status': 401});
            }
        }
    });

});

module.exports = router;

