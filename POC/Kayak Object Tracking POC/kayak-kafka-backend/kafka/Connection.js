var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function(topic_name_array,group_id) {
        if (!this.kafkaConsumerConnection) {
            this.client = new kafka.Client("localhost:2181");
            this.kafkaConsumerConnection = new kafka.Consumer(
                this.client,topic_name_array,{groupId: group_id});
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
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;