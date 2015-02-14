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
var pubsub  = require('node-internal-pubsub');

var redisClient = redis.createClient();
var redisSub = redis.createClient();
var pub = pubsub.createPublisher();

// Subscribe to all incoming messages, and publish them to the internal pubsub
redisSub.psubscribe('*');
redisSub.on('pmessage', function(pattern, channel, msg) {
    pub.publish(channel, msg);
});

http.globalAgent.defaultMaxSockets = 100000;
http.globalAgent.maxSockets = 100000;

// Redis publisher
//var publisher = redis.createClient();

// Rates.AlgoTrading class declaration
function Raat(configuration){

    configuration = configuration || {};

    console.log('RAAT: Server started with follow configuration:', configuration);

    var optPort = (configuration.port !== undefined) ? configuration.port : 8002;
    var optPrefix = '/' + ((configuration.prefix !== undefined) ? configuration.prefix : 'raat');

    var optGeneralChannel = 'general_channel';

    // SockJS server
    var sockjsOpts = {sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js', log: function (severity, message){
        if (severity=="error") console.log(message);
    }};
    var sockjsServer = sockjs.createServer(sockjsOpts);

    sockjsServer.on('connection', function(connection) {

        // Create internal subscriber for each connections
        var subscriber = pubsub.createSubscriber();

        subscriber.on('message', function(channel, message) {
            console.log('RAAT: Channel [', channel, '] received message for client:', message);
            connection.write(message);
        });

        // When we receive a message from client, send it to be published
        connection.on('data', function(message) {
            try{
                var messageObject = JSON.parse(message);
                var channel = messageObject.channel ? messageObject.channel : optGeneralChannel;
                delete messageObject['channel'];

                if (messageObject.command){
                    if (messageObject.command == 'subscribe'){
                        subscriber.subscribe(channel);
                    }
                    return;
                }

                redisClient.publish(channel, JSON.stringify(messageObject));
            } catch (e){
                console.log("RAAT: Invalid message JSON format", message);
            }
            // redisClient.publish(optGeneralChannel, message);
            //publisher.publish('chat_channel', message);
        });
    });

    // Express server
    var expressApplication = express();
    var httpServer = http.createServer(expressApplication);
    httpServer.maxConnections = (1024 * 1024);
    sockjsServer.installHandlers(httpServer, {prefix: optPrefix});

    console.log('RAAT:  [*] Listening on 0.0.0.0:' + optPort);
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