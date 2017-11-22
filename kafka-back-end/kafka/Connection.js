var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function() {
        if (!this.kafkaConsumerConnection) {

            this.client = new kafka.Client("localhost:2181");
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,[
                { topic: 'login', partition: 0 } , {topic :'getapi',partition :0},{topic :'MmtCars',partition :0},
                {topic :'CleartripCars',partition :0},{topic :'AlamoCars',partition :0},{topic :'MmtHotels',partition :0},
                {topic :'CleartripHotels',partition :0},{topic :'TripAdvisorHotels',partition :0},
                {topic :'MmtFlights',partition :0},
                {topic :'CleartripFlights',partition :0},{topic :'ExpediaFlights',partition :0}]);

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