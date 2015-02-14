'use strict';

var Raat = require('./../lib/raat').Raat;
var WebSocket = require('ws');

var optPort = 8002, optPrefix = 'raat';
var raatOpts = {port: optPort, prefix: optPrefix};

// Run server
new Raat(raatOpts);

// Run clients

var clients = [], i = 0;
var testSize = 100000;

var RaatClient = function(i){
    var ws;
    ws = new WebSocket('ws://127.0.0.1:' + optPort + '/' + optPrefix + '/websocket');
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
        console.log('CLIENT: #%s %s', i, err);
        throw err;
    });
};

function createNewClient(){
    if (i++ >= testSize){
        return;
    }
    var raatClient = new RaatClient(i);
    clients.push(raatClient);
    if (!(i % 1000)) {
        console.log('Create client #' + i);
    }
    setTimeout(createNewClient, 1);
}

createNewClient();