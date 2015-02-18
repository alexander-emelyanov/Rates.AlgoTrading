'use strict';

var Raat = require('./../lib/raat').Raat;
var SockJS = require('sockjs-client-node');

var optPort = 8002, optPrefix = 'raat';
var raatOpts = {port: optPort, prefix: optPrefix};

// Run server
new Raat(raatOpts);

// Raat clients
var testSize = 100;

var RaatClient = function(opts){

    var that = this;

    var messagesHistory = [];

    this.connection = new SockJS('http://127.0.0.1:' + optPort + '/' + optPrefix);

    this.connection.onopen = function() {
        if (opts && typeof opts.onOpen == 'function'){
            opts.onOpen(that);
        }
    };

    this.connection.onmessage = function(message) {
        try{
            var messageObject = JSON.parse(message.data);
            if (opts && typeof opts.onMessage == 'function'){
                opts.onMessage(that, messageObject);
            }
        } catch (e){
            console.log('CLIENT: Invalid message JSON format');
        }
    };

    this.connection.onclose = function() {
        //console.log('CLIENT: Connection closed');
    };

    this.connection.onerror = function(err) {
        //console.log('CLIENT: Error #%s %s', i, err);
        // throw err;
    };
};

RaatClient.prototype.sendMessage = function(channel, message){
    message.channel = channel;
    this.connection.send(JSON.stringify(message));
};

RaatClient.prototype.subscribe = function(channel){
    this.sendMessage(channel, {command: 'subscribe'});
};

var consumer = new RaatClient({
    onOpen: function(raatClient){
        raatClient.subscribe('EUR\\USD');
    },
    onMessage: function(raatClient, messageObject){
        console.log('Consumer received a message', messageObject);
    }
});

// Grabber #1
new RaatClient({onOpen: function(raatClient){
    for(var i = 0; i < testSize; i++){
        raatClient.sendMessage('EUR\\USD', {rate: Math.random()});
    }
}});

// Grabber #2
new RaatClient({onOpen: function(raatClient){
    for(var i = 0; i < testSize; i++){
        raatClient.sendMessage('EUR\\USD', {type: 'tick', rate: Math.random(), created_at: (new Date).toISOString()});
    }
}});