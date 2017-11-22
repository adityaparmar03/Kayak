var connection =  new require('./kafka/Connection');
var users = require('./services/user');
var car = require('./services/car');
var hotels = require('./services/hotel');
var flights = require('./services/flight');
var admin = require('./services/admin');
var consumer = connection.getConsumer();
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {

    console.log('message received');
    console.log(message);
    console.log(JSON.stringify(message.value));

    var data = JSON.parse(message.value);
    var body = data.data;
//************************************************************************************************************************

  switch(message.topic){


      case 'login':

           users.registercar(body,function (err,res) {
               response(data,res);
               return;
           })


        break;

      case 'getapi':
          console.log("inside get cars topic");
            admin.fetchUrl(body,function (err , res) {
                response(data,res);
                return;
            })

          break;


      case 'MMT':
          console.log("inside get MMT topic");
          car.searchCars(body,function (err , res) {
              response(data,res);
              return;
          })

          break;


      case 'cleartrip':
          console.log("inside get cleartrip topic");
          car.searchCars(body,function (err , res) {
              response(data,res);
              return;
          })

          break;



      default:
          console.log("Topic not found");
          break;


      //case ''

/*
    else if(message.topic=='getuser'){
        user.getUserDetails(data.data, function(err,res){

            response(data, res);
            return;
        });
    }*/




  }
});



//************************************************************************************************************************
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
    console.log("***************************");
    console.log(payloads);
    console.log("***************************");

    producer.send(payloads, function(err, data){
        console.log(data);
    });
}
//************************************************************************************************************************


