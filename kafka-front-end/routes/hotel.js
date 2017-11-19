var express = require('express');
var kafka = require('./kafka/client');
var router = express.Router();

/* GET hotel list */
router.get('/hotels', function (req, res) {

    kafka.make_request('searchhotels',{"searchcriteria":req.query}, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.send({'status': 401});
        }
        else
        {
            if(results.code == 200){
                console.log(results.value)
                res.send({'hotels': results.value, 'status': 201});
            }
            else {
                res.send({'status': 401});
            }
        }
    });

});

module.exports = router;