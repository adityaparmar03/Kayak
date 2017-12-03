var mysql = require('../models/mysql');
const chart_queries = require('./chart_queries');

function handle_request(msg, callback){

    var chartQuery;
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    switch(msg.query) {
    case 'barChartQuery':
        chartQuery=chart_queries.barChartQuery;
        break;
    case 'pieChartQuery':
        chartQuery=chart_queries.pieChartQuery;
        break;
    case 'histogramQuery':
        chartQuery=chart_queries.histogramQuery;
        break;
    case 'donutChartQuery':
        chartQuery=chart_queries.donutChartQuery;
        break;
    case 'top5CarChart':
        chartQuery=chart_queries.top5CarChart;
        break;
    case 'top5FlightChart':
        chartQuery=chart_queries.top5FlightChart;
        break;
    case 'top5HotelChart':
        chartQuery=chart_queries.top5HotelChart;
        break;
    case 'top5Chart':
        chartQuery=chart_queries.top5Chart;
        break;
    case 'wordTree':
         chartQuery=chart_queries.wordTree;
        break;
    default:
        break;

    }

    console.log("Query is:" + chartQuery);


    mysql.fetchData(function (err,results) {

        if (err){
            console.log("ERROR: " + err.message);
            res.code = "400";
            res.value = "Sorry!, DB query failed.";
            res.results = results;
            callback(null, res);
            throw err;
        }
        else {
            res.code = "200";
            res.value = "DB query successfull !!!.";
            res.results = results;
            console.log('My response',res);
            callback(null, res);
        }
    } , chartQuery);
}

exports.handle_request = handle_request;