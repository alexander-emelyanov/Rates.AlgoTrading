/*
 * Rates.AlgoTrading
 * https://github.com/alexander-emelyanov/Rates.AlgoTrading
 *
 * Copyright © 2015 Alexander Emelyanov
 * Licensed under the GNU GPL V2.0 license.
 */

'use strict';

// Private members, shared among all instances of the class
var express = require('express');
var sockjs  = require('sockjs');
var http    = require('http');
var redis   = require('redis');

http.globalAgent.defaultMaxSockets = 100000;
http.globalAgent.maxSockets = 100000;

// Redis publisher
//var publisher = redis.createClient();

// Rates.AlgoTrading class declaration
function Raat(configuration){

    configuration = configuration || {};

    console.log('SERVER: Raat server started with follow configuration:', configuration);

    var optPort = (configuration.port !== undefined) ? configuration.port : 8002;
    var optPrefix = '/' + ((configuration.prefix !== undefined) ? configuration.prefix : 'raat');

    // SockJS server
    var sockjsOpts = {sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js', log: function (severity, message){
        if (severity=="error") console.log(message);
    }};
    var sockjsServer = sockjs.createServer(sockjsOpts);

    sockjsServer.on('connection', function(connection) {
        //var browser = redis.createClient();
        //browser.subscribe('default_channel');
        //// When we see a message on chat_channel, send it to the client
        //browser.on("message", function(channel, message){
        //    connection.write(message);
        //});
        // When we receive a message from client, send it to be published
        connection.on('data', function(message) {
            console.log('SERVER: Received message', message);
            //publisher.publish('chat_channel', message);
        });
    });

    // Express server
    var expressApplication = express();
    var httpServer = http.createServer(expressApplication);
    httpServer.maxConnections = (1024 * 1024);
    sockjsServer.installHandlers(httpServer, {prefix: optPrefix});

    console.log('SERVER:  [*] Listening on 0.0.0.0:' + optPort);
    httpServer.listen(optPort, '0.0.0.0', 65535);

}

Raat.prototype.awesome = function() {
  return 'awesome';
};

Raat.prototype.testMethod = function(){
    return 'test value';
};

// Export class
exports.Raat = Raat;