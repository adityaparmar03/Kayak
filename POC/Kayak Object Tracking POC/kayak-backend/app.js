const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
var kafka_click_tracker= require('./kafka/services/click_tracker');


app.use(logger('dev'));
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res) {
    res.send('Hello World!')
})


app.post('/clicktracker', function(req, res) {

    console.log("Inside app.js")
    console.log("Request Body : ",req.body)
    kafka_click_tracker.make_request(req, function(err,results){
        if(err){
            console.log(err);
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



app.listen(5000, function() {
    console.log('Example app listening on port 5000!')
})
