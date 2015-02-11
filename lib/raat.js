/*
 * Rates.AlgoTrading
 * https://github.com/alexander-emelyanov/Rates.AlgoTrading
 *
 * Copyright (c) 2015 Alexander Emelyanov
 * Licensed under the GNU GPL V2.0 license.
 */

'use strict';

// Private members, shared among all instances of the class
var express = require('express');
var sockjs  = require('sockjs');
var http    = require('http');
var redis   = require('redis');

// Rates.AlgoTrading class declaration
function Raat(configuration){

    console.log('Raat server started with follow configuration:', configuration);

    var optPort = (configuration.port !== undefined) ? configuration.port : 8002;
    var optPrefix = '/' + ((configuration.prefix !== undefined) ? configuration.prefix : 'raat');

    // SockJS server
    var sockjsOpts = {sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js'};
    var sockjsServer = sockjs.createServer(sockjsOpts);

    sockjsServer.on('connection', function(connection) {
        var browser = redis.createClient();
        browser.subscribe('default_channel');
        // When we see a message on chat_channel, send it to the client
        browser.on("message", function(channel, message){
            connection.write(message);
        });
        // When we receive a message from client, send it to be published
        connection.on('data', function(message) {
            console.log('Received message', message);
            publisher.publish('chat_channel', message);
        });
    });

    // Express server
    var expressApplication = express();
    var httpServer = http.createServer(expressApplication);
    sockjsServer.installHandlers(httpServer, {prefix: optPrefix});

    console.log(' [*] Listening on 0.0.0.0:' + optPort);
    httpServer.listen(optPort, '0.0.0.0');

};

Raat.prototype.awesome = function() {
  return 'awesome';
};

Raat.prototype.testMethod = function(){
    return 'test value';
}

// Export class
exports.Raat = Raat;