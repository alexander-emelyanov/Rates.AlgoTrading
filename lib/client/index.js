'use strict';

var WebSocket = require('ws');

function RaatClient(opts){

    var that = this;

    var optHost = (opts && opts.host) ? opts.host : '127.0.0.1';
    var optPort = (opts && opts.port) ? opts.port : 8002;
    var optPath = (opts && opts.path) ? opts.path : 'raat';

    var connectionString = 'ws://' + optHost + ':' + optPort + '/' + optPath + '/websocket';
    console.log('Connection string: ' + connectionString);

    this.connection = new WebSocket(connectionString);

    this.connection.on('open', function() {
        console.log('Connected successfully');
        if (opts && typeof opts.onOpen == 'function'){
            opts.onOpen(that);
        }
    });
    this.connection.on('message', function(msg) {
        console.log('Received: %s', msg);
    });
    this.connection.on('close', function() {
        console.log('Connection closed');
    });
    this.connection.on('error', function(err) {
        console.log('Error: ', err);
        throw err;
    });
}

/**
 * @param channel
 * @param message
 */
RaatClient.prototype.sendMessage = function(channel, message){
    message.channel = channel;
    console.log('Send message to channel [%s]', channel, message);
    this.connection.send(JSON.stringify(message));
};

RaatClient.prototype.subscribe = function(channel){
    this.sendMessage(channel, {command: 'subscribe'});
};

// We export RaatClient class only...
module.exports = RaatClient;