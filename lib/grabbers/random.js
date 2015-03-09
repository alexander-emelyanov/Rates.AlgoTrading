'use strict';

var util = require('util');
var nconf = require('nconf');

nconf.argv();

nconf.defaults({
    host: '127.0.0.1',
    port: 8002,
    path: 'raat'
});

var RaatClient = require('../client');

util.inherits(RaatGrabber, RaatClient);

function RaatGrabber(opts){
    this.rate = 100;
    opts.onOpen = this.start;
    RaatClient.call(this, opts);
}

RaatGrabber.prototype.start = function(raatGrabber){
    console.log('RaatGrabber.prototype.start');
    raatGrabber.tick(raatGrabber);
};

RaatGrabber.prototype.tick = function(raatGrabber){

    var scale = 2;

    var deviation = scale * (1/2 -Math.random());

    this.rate = Math.max(0, this.rate + deviation);

    var messageObject = {'rate': this.rate, type: 'tick', created_at: (new Date).toISOString(), symbol_id: 1};

    raatGrabber.sendMessage('random', messageObject);

    var interval = 500 * Math.random();
    setTimeout(function(){
        raatGrabber.tick(raatGrabber);
    }, interval);
};

var raatGrabber = new RaatGrabber({
    host: nconf.get('host'),
    port: nconf.get('port'),
    path: nconf.get('path')
});