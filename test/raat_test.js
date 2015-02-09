'use strict';

var raat = require('../lib/raat.js').raat;

var raat_instance = new raat();

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
        test.equal(raat_instance.awesome(), 'awesome', 'should be awesome.');
        test.equal(raat_instance.testMethod(), 'test value', 'should be test.');
        test.done();
    }
};
