'use strict';

let tests = 0;
const failures = [];
const suites = [];

global.describe = function describe(name, callback) {
    suites.push(name);
    try {
        callback();
    } finally {
        suites.pop();
    }
};

global.it = function it(name, callback) {
    tests += 1;
    try {
        callback();
    } catch (error) {
        failures.push({
            name: suites.concat(name).join(' > '),
            error: error
        });
    }
};

require('../test/api-tests.js');

if (failures.length > 0) {
    failures.forEach(function (failure) {
        console.error('\n' + failure.name + '\n' + failure.error.stack);
    });
    console.error('\n' + failures.length + ' of ' + tests + ' API tests failed');
    process.exit(1);
}

console.log(tests + ' API tests. 0 failures.');
