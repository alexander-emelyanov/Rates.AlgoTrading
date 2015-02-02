'use strict';

var Rates_AlgoTrading = require('../lib/Rates.AlgoTrading.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['awesome'] = {
    setUp: function(done) {
        // setup here
        done();
    },
    'no args': function(test) {
        test.expect(2);
        // tests here
        test.equal(Rates_AlgoTrading.awesome(), 'awesome', 'should be awesome.');
        test.equal(Rates_AlgoTrading.testMethod(), 'test value', 'should be test.');
        test.done();
    }
};
