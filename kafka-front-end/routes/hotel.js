var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
/*



var express = require('express');
var kafka = require('./kafka/client');

/!* GET users listing. *!/
router.get('/', function (req, res) {

    kafka.make_request('gethotels',{"searchcriteria":req.body}, function(err,results){

        console.log('in result');
        console.log(results);
        if(err){
            res.send({'status': 401});
        }
        else
        {
            if(results.code == 200){
                console.log(results.value.hotels)
                res.send({'hotels': results.value.hotels, 'status': 201});
            }
            else {
                res.send({'status': 401});
            }
        }
    });

});

*/
