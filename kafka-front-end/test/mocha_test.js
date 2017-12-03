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



    it('should sign up the user with valid credentials', function(done) {
        request.post('http://localhost:3001/user/login', {
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
        http.get('http://localhost:3001/hotel/hotels', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });



});