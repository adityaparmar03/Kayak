
var mysql = require('kafka-front-end/models/mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root', //Enter password
    database : 'cmpe273_kayak',
    port	 : 3306
});

// For Select Queries
function fetchData(callback,sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);

    pool.getConnection(function(err,connection) {

        connection.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                console.log("ERROR: " + err.message);
            }
            else {	// return err or result
                console.log("DB Results:" + rows);
                callback(err, rows);
            }
        });
        console.log("\nConnection closed..");
        connection.release();
    });
}

// for insert, update, delete queries
function executeQuery(callback, sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);


    pool.getConnection(function(err,connection) {

        connection.query(sqlQuery, function (err, result) {
            callback(err);
        });
        console.log("\nConnection closed..");
        connection.release();
    });
}


exports.fetchData=fetchData;
exports.executeQuery=executeQuery;



