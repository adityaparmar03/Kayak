
const db = require('../../databaseAPI');

function handle_request(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    var clickTrackingQuery = "insert into click_tracker (userId, sessionId,eventTime,eventName,pageId,buttonId,objectId)VALUES('" +
                msg.userId +
                "','" +
                msg.sessionId +
                "','" +
                msg.eventTime +
                "','" +
                msg.eventName +
                "','" +
                msg.pageId +
                "','" +
                msg.buttonId +
                "','" +
                msg.objectId +"')";

    console.log("Query is:" + clickTrackingQuery);

    db.executeQuery(function(err, results) {
        if (err) {
            console.log("ERROR: " + err.message);
            res.code = "400";
            res.value = "Sorry!, DB inset query failed.";
            callback(null, res);
            throw err;
        } else {
            res.code = "200";
            res.value = "DB inset query successfull !!!.";
            console.log('My response',res);
            callback(null, res);
        }
    }, clickTrackingQuery);

}

exports.handle_request = handle_request;