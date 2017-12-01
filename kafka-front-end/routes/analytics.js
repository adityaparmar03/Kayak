var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');


//************************************************************************************************************************

router.post('/clicktracker', function (req, res) {

     // var reqEmail = req.body.email;
     //  var reqPassword = req.body.password;

    console.log("Inside app.js")
    console.log("Request Body : ",req.body)
    kafka.make_request('click_tracker_req',req.body, function(err,results){
        if(err){
            console.log(err);
            res.status(400).json({status:400});
        }
        else
        {
            if(results.code == 200){
                res.status(200).json({status:200,result:results.value});
            }
            else {
                res.status(400).json({status:400,result:results.value});
            }
        }
    })

});

//************************************************************************************************************************

router.post('/getchart', function (req, res) {

    console.log("Inside app.js")
    console.log("Request Body : ",req.body)
    kafka.make_request("get_chart_req",req.body, function(err,results){
        if(err){
            console.log(err);
        }
        else
        {
            if(results.code == 200){
                console.log("==========================");
                console.log(results.results);
                console.log("==========================");
                res.status(200).json({status:200,data:results.results});
            }
            else {
                res.status(400).json({status:400,data:results.results});
            }
        }
    })

});

//************************************************************************************************************************

router.get('/checkSession', function (req, res) {

    // var reqEmail = req.body.email;
    //  var reqPassword = req.body.password;
   console.log(req.session);
   if(req.session.isloggedin){
       res.send({"status":201});
   }
   else {
       res.send({"status": 401});
   }
});


module.exports = router;
