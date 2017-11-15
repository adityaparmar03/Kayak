/**
 * Mocha Test
 */
var request = require('request');
var express = require('express');
var assert = require("assert");
var http = require("http");

describe('Login', function() {

    it('should login', function(done) {
        request.post('http://localhost:3001/users/login', {
            form : {
                email : 'abcd',
                password : 'def'
            }
        }, function(error, response, body) {

            assert.equal(200, response.statusCode);
            done();
        });
    });
});

