var rpc = new (require('../kafkarpc'))();

//make request to backend
function make_request(req, callback){

    
    var userId = req.body.userId;
    var sessionId = req.body.sessionId;
    var eventTime = req.body.eventTime;
    var eventName = req.body.eventName;
    var pageId = req.body.pageId;
    var buttonId = req.body.buttonId;
    var objectId = req.body.objectId;



    msg_payload = {
        userId: userId,
        sessionId: sessionId,
        eventTime: eventTime,
        eventName: eventName,
        pageId: pageId,
        buttonId: buttonId,
        objectId: objectId
    }

    console.log("Inside Signup payload",JSON.stringify(msg_payload));
    rpc.makeRequest('click_tracker_req', 'click_tracker_res', msg_payload, function(err, response){
        if(err)
            console.error(err);
        else{
            console.log("response", response);
            callback(null, response);
        }
    });
}

exports.make_request = make_request;
