var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function() {
        if (!this.kafkaConsumerConnection) {

            this.client = new kafka.Client("localhost:2181");
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,[

                    { topic: 'login', partition: 0 },
                    { topic: 'register', partition: 0 },
                    { topic: 'update', partition: 0 },
                    {topic :'getapi',partition :0},
                    {topic :'MmtCars',partition :0},
                    {topic :'CleartripCars',partition :0},
                    {topic :'AlamoCars',partition :0},
                    {topic :'MmtHotels',partition :0},
                    {topic :'CleartripHotels',partition :0},
                    {topic :'TripAdvisorHotels',partition :0},
                    {topic :'MmtFlights',partition :0},
                    {topic :'CleartripFlights',partition :0},
                    {topic :'ExpediaFlights',partition :0},
                    {topic :'BookFlight',partition :0},
                    {topic :'BookHotel',partition :0},
                    {topic :'BookCar',partition :0},
                    {topic :'addvendor',partition :0},
                    {topic :'deletevendor',partition :0},
                    {topic :'getvendors',partition :0},
                    {topic :'bookings',partition :0},
                    {topic :'deleteuser',partition :0},
                    {topic :'getallusers',partition :0},
                    {topic :'getuserdata',partition :0},
                    {topic :'getbills',partition :0},
                    {topic :'addhistory',partition :0},
                    {topic :'searchhistory',partition :0},
                    {topic :'click_tracker_req',partition :0},
                    {topic :'addhotel',partition :0},
                    {topic :'addcar',partition :0},
                    {topic :'addflight',partition :0},
                    {topic :'getflightlist',partition :0},
                    {topic :'deleteflight',partition :0},
                    {topic :'gethotellist',partition :0},
                    {topic :'deletehotel',partition :0},
                    {topic :'getcarlist',partition :0},
                    {topic :'deletecar',partition :0},
                {topic :'get_chart_req',partition :0},
                    {topic:'upload',partition:0}
                 ]);

            this.client.on('ready', function () { console.log('client ready!') })
        }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;
