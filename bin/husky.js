#!/usr/bin/env node

let child_process = require('child_process');
let {colorLog} = require('./console.js');
let ENVJson, {testBranch} = require('../env.js');

let local = '';
child_process.exec(`git symbolic-ref --short -q HEAD`
, {}
, function(error, stdout, stderr) {
    local = stdout;
});

module.exports = {};