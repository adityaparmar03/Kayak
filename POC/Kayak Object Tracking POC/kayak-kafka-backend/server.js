var connection =  new require('./kafka/Connection');
var click_tracker =  new require('./kafka/services/click_tracker');
var topic_array = [{topic:'click_tracker_req', partition: 0}];


var group_id = 'kafka-node-group';
var consumer = connection.getConsumer(topic_array,group_id);
var producer = connection.getProducer();

consumer.on('message', function (message) {
    //console.log("message",message);
    var data = JSON.parse(message.value);
    var req_topic_name = message.topic;
    //console.log("message",message);
    switch(req_topic_name){

        case "click_tracker_req":

            click_tracker.handle_request(data.data, function(err,res){
                //console.log('after handle',res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                console.log(payloads);
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
           
            break;
            
        default :
        
                break;

    }
});
