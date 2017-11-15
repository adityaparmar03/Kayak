var connection =  new require('./kafka/Connection');
var users = require('./services/users');
var cars = require('./services/cars');
var hotels = require('./services/hotels');
var flights = require('./services/flights');

var consumer = connection.getConsumer();
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {

    console.log('message received');
    console.log(message);
    console.log(JSON.stringify(message.value));

    var data = JSON.parse(message.value);


    if(message.topic=='login') {
        users.login(data.data, function (err, res) {

            response(data, res);
            return;
        });
    }
/*
    else if(message.topic=='getuser'){
        user.getUserDetails(data.data, function(err,res){

            response(data, res);
            return;
        });
    }*/
});

function response(data, res) {
    var payloads = [
        { topic: data.replyTo,
            messages:JSON.stringify({
                correlationId:data.correlationId,
                data : res
            }),
            partition : 0
        }
    ];
    producer.send(payloads, function(err, data){
        console.log(data);
    });
}