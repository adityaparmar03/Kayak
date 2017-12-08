/**
 * Mocha Test
 */
var request = require('request');
var express = require('express');
var assert = require("assert");
var http = require("http");

describe('http tests', function() {


    it('should register the user', function(done) {
        request.post('http://localhost:3001/user/register', {
            form : {
                "email": "Sunil280719871@gmail.com",
                "password": "Sunil@28"
            }
        }, function(error, response, body)
        {
            //console.log(response.statusCode);
            //console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
    });



    // it('should sign up the user with valid credentials', function(done) {
    //     request.post('http://localhost:3001/user/login', {
    //         form : {
    //             "email": "Sunil28071987@gmail.com",
    //             "password": "Sunil@28"
    //         }
    //     }, function(error, response, body)
    //     {
    //         //console.log(response.statusCode);
    //         //console.log(body);
    //         assert.equal(200, response.statusCode);
    //         done();
    //     });
    // });


    it('should return the chart information', function(done) {
        request.post('http://localhost:3001/analytics/getchart', {
            form : {"name":"ClickThroughput","type":"BarChart","index":"1","query":"barChartQuery"}
        }, function(error, response, body)
        {
            //console.log(response.statusCode);
            //console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
    });


    it('should return the booking history of the user', function(done) {
        this.timeout(5000);
        http.get('http://localhost:3001/user/bookinghistory', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });


    it('should return error for listing all the hotels for vendors as no parameter is provided', function(done) {
        this.timeout(5000);
        http.get('http://localhost:3001/hotel/gethotels', function(res) {
            assert.equal(500, res.statusCode);
            done();
        })
    });



    it('should return the hotels as no parameter is provided', function(done) {
        this.timeout(5000);
        http.get('http://localhost:3001/hotel/hotels?city=San%20Jose&state=California&roomtype=delux', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

///////////////////////////////////////////////////


it('should throw erro as the user is duplicate', function(done) {
    request.post('http://localhost:3001/user/login', {
        form : {
            "email": "Sunil280719871@gmail.com",
            "password": "Sunil@28"
        }
    }, function(error, response, body)
    {
        //console.log(response.statusCode);
        //console.log(body);
        assert.equal(500, response.statusCode);
        done();
    });
});


it('should return the Barchart information for User', function(done) {
    request.post('http://localhost:3001/analytics/getchart', {
        form : {"name":"ClickThroughput","type":"BarChart","index":"1","query":"barChartQuery"}
    }, function(error, response, body)
    {
        //console.log(response.statusCode);
        //console.log(body);
        assert.equal(200, response.statusCode);
        done();
    });
});


it('should return the Donutchart information for User', function(done) {
    request.post('http://localhost:3001/analytics/getchart', {
        form : {"name":"TimeSpentOnAPage","type":"DonutChart","index":"2","query":"donutChartQuery"}
    }, function(error, response, body)
    {
        //console.log(response.statusCode);
        //console.log(body);
        assert.equal(200, response.statusCode);
        done();
    });
});

it('should return the Histogram Chart information for User', function(done) {
    request.post('http://localhost:3001/analytics/getchart', {
        form : {"name":"Top5MostActiveUsers","type":"Histogram","index":"3","query":"histogramQuery"}
    }, function(error, response, body)
    {
        //console.log(response.statusCode);
        //console.log(body);
        assert.equal(200, response.statusCode);
        done();
    });
});


it('should return the Top5CarChart information for Car', function(done) {
    request.post('http://localhost:3001/analytics/getchart', {
        form : {"name":"Top5CarChart","type":"Top5CarChart","index":"5","query":"top5CarChart"}
    }, function(error, response, body)
    {
        //console.log(response.statusCode);
        //console.log(body);
        assert.equal(200, response.statusCode);
        done();
    });
});


it('should return the Top5CarChart information for Flight', function(done) {
    request.post('http://localhost:3001/analytics/getchart', {
        form : {"name":"Top5FlightChart","type":"Top5FlightChart","index":"7","query":"top5FlightChart"}
    }, function(error, response, body)
    {
        //console.log(response.statusCode);
        //console.log(body);
        assert.equal(200, response.statusCode);
        done();
    });
});



it('should return the Top5CarChart information for Hotel', function(done) {
    request.post('http://localhost:3001/analytics/getchart', {
        form : {"name":"Top5HotelChart","type":"Top5HotelChart","index":"8","query":"top5HotelChart"}
    }, function(error, response, body)
    {
        //console.log(response.statusCode);
        //console.log(body);
        assert.equal(200, response.statusCode);
        done();
    });
});


});
