var connection =  new require('./kafka/Connection');
var user = require('./services/user');
var car = require('./services/car');
var hotel = require('./services/hotel');
var flight = require('./services/flight');
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

           user.login(body,function (err,res) {
               response(data,res);
               return;
           })


        break;

      case 'register':
          console.log("inside the switch case");
          user.register(body,function (err,res) {
              response(data,res);
              return;
          })
          break;

      case'update':
          console.log("Inside the update switch case");
           user.update(body,function (err,res) {
               response(data,res);
               return;
           })
          break;

      case 'getapi':
          console.log("inside get api topic");
            admin.fetchUrl(body,function (err , res) {
                response(data,res);
                return;
            })

          break;


      case 'MmtCars':
      case 'AlamoCars':
      case 'CleartripCars':

          car.searchCars(body,function (err , res) {
              response(data,res);
              return;
          })

          break;

      case 'MmtHotels':
      case 'TripAdvisorHotels':
      case 'CleartripHotels':

          hotel.searchHotels(body,function (err , res) {
              response(data,res);
              return;
          })

          break;

      case 'MmtFlights':
      case 'ExpediaFlights':
      case 'CleartripFlights':

          flight.searchFlights(body,function (err , res) {
              response(data,res);
              return;
          });

          break;

      case 'MmtFlightsBook':
      case 'ExpediaFlightsBook':
      case 'CleartripFlightsBook':
          console.log("Topic Found!!!!!!!!!!!!!!!!!");
          console.log(message);
          flight.bookFlight(body,function (err , res) {
              console.log("In Final Response!!!;");
              response(data,res);
              return;
          });
          break;

      default:
          console.log("Topic not found");
          break;


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
