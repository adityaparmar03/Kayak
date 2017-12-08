var connection =  new require('./kafka/Connection');
var user = require('./services/user');
var car = require('./services/car');
var hotel = require('./services/hotel');
var flight = require('./services/flight');
var admin = require('./services/admin');
var click_tracker = require('./services/click_tracker');
var get_chart = require('./services/get_chart');
var consumer = connection.getConsumer();
var producer = connection.getProducer();
var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');


console.log('server is running');
consumer.on('message', function (message) {

    console.log('message received');
    console.log(message);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var body = data.data;
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

        case 'getuserdata':
            console.log("inside the switch case");

            console.log(body);

            console.log("********************");

            user.getuserdata(body,function (err,res) {
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

        case'bookings':
            console.log("Inside the update switch case");
            user.bookinghistory(body,function (err,res) {
                response(data,res);
                return;
            })
            break;


        case'deleteuser':
            console.log("Inside the deleteuser switch case");
            user.deleteuser(body,function (err,res) {
                console.log("#############################");
                console.log(res);
                console.log("#############################");
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

        case 'getallusers':
            console.log("inside get user api topic");
            admin.getusers(body,function(err,res){
                response(data,res);
                return;
            })
            break;

        case 'upload':
            console.log("inside upload topic");
            user.upload(body,function (err , res) {
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

        case 'addvendor':
            console.log(message);
            admin.addVendor(body,function (err , res) {
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'deletevendor':
            console.log(message);
            admin.deleteVendor(body,function (err , res) {
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'getvendors':
            console.log(message);
            admin.getVendors(body,function (err , res) {
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'getbills':

            admin.getBills(body,function (err,res) {
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);

            })

            break;

        case 'addhistory':
            user.addHistory(body, function(err,res){
                //console.log('after handle',res);
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'addhotel':
            hotel.addHotel(body, function(err,res){
                //console.log('after handle',res);
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'addflight':
            flight.addFlight(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'addcar':
            car.addCar(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'getflightlist':
            flight.getFlightList(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'deleteflight':
            flight.deleteFlight(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'getcarlist':
            car.getCarList(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'deletecar':
            car.deleteCar(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'gethotellist':
            hotel.getHotelList(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'deletehotel':
            hotel.deleteHotel(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'searchhistory':
            user.searchHistory(body, function(err,res){

                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;


        case 'BookFlight':
            console.log(message);
            flight.bookFlight(body,function (err , res) {
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'BookHotel':
            console.log(message);
            hotel.bookHotel(body,function (err , res) {
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'BookCar':
            console.log(message);
            car.bookCar(body,function (err , res) {
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        case 'click_tracker_req':

            click_tracker.handle_request(body, function(err,res){
                //console.log('after handle',res);
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });

            break;

        case 'get_chart_req':
            get_chart.handle_request(body, function(err,res){
                //console.log('after handle',res);
                if(err)
                    console.log(err);
                else
                    console.log(res);
                response(data,res);
                return;
            });
            break;

        default:
            console.log("Topic not found");
            break;


    }
});

// Redis Config

var redis = require('ioredis');
var MongooseRedis = require('mongoose-with-redis');
var redisClient = redis.createClient();

var cacheOptions = {
    cache: true,
    expires: 60, // keeping it low for now , will extend in future
    prefix: 'RedisCache'
};

MongooseRedis(mongoose, redisClient, cacheOptions);

// End of Redis Config

mongoose.connect('mongodb://localhost:27017/cmpe273_kayak').then(function(){
	  console.log(" Connected to DropBox Mongo DB ".green);
	}).catch(err => console.error("error connecting to mongo" + err));
//************************************************************************************************************************




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
