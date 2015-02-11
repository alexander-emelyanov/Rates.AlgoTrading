'use strict';

var Raat = require('./../lib/raat').Raat;
var WebSocket = require('ws');

var optPort = 8002, optPrefix = 'raat';
var raatOpts = {port: optPort, prefix: optPrefix};

// Run server
new Raat(raatOpts);

var clients = [];
var testSize = 100;

var RaatClient = function(){
    var ws;
    ws = new WebSocket('ws://127.0.0.1:8002/raat/websocket');
    ws.on('open', function() {
        ws.send('Current time: ' + process.hrtime());
    });
    ws.on('message', function(msg) {
        console.log('CLIENT: Received: %s', msg);
    });
    ws.on('close', function() {
        console.log('CLIENT: Connection closed');
    });
    ws.on('error', function(err) {
        console.log('CLIENT: Error occurred: %s', err);
        throw err;
    });
};

for(var i = 0; i < testSize; i++){
    var raatClient = new RaatClient();
    clients.push(raatClient);
}