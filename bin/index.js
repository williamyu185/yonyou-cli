#!/usr/bin/env node
let child_process = require('child_process');

child_process.exec('git clone https://github.com/williamyu185/yonyou-cli.git coordination-cli', {}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }else {
        console.log('Download successful!');
    }
});