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

// Class declaration
function Raat(configuration){
    console.log('Raat server started with follow configuration:', this);
};

Raat.prototype.awesome = function() {
  return 'awesome';
};

Raat.prototype.testMethod = function(){
    return 'test value';
}

// Export class
exports.Raat = Raat;