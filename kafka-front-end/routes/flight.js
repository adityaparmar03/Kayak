var express = require('express');
var kafka = require('./kafka/client');
var router = express.Router();

/* GET flight list*/
router.get('/flights', function (req, res) {

    kafka.make_request('searchflights',{"searchcriteria":req.query}, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.send({'status': 401});
        }
        else
        {
            if(results.code == 200){

                res.send({'flights': results.value, 'status': 201});
            }
            else {
                res.send({'status': 401});
            }
        }
    });

});

module.exports = router;