'use strict';

// DB manager instance shared among all instances of the ReceivedTicksProcessor
// Create using default connection config of process.env.DATABASE_URL:
var db = require('pg-db')();

var runningProcessesCount = 0;

function ReceivedTicksProcessor(){

}

ReceivedTicksProcessor.prototype.process = function(tick){
    tick.received_at = (new Date).toISOString();
    tick.symbol_id = 14;
    // Same query with named parameters:
    runningProcessesCount++;
    db.update('INSERT INTO tick'
        + ' (created_at, received_at, rate, symbol_id)'
        + ' VALUES '
        + ' (:created_at, :received_at, :rate, :symbol_id)'
        , tick
        , function(err) {
            runningProcessesCount--;
            if( err ) {
                return console.error('Err: %s', err);
            }
            console.log('ReceivedTicksProcessor: insert tick completed at: %s, running processes count: %s', (new Date).toISOString(), runningProcessesCount);
        }
    );
};

module.exports = ReceivedTicksProcessor;