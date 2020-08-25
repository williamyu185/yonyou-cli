#!/usr/bin/env node
let child_process = require('child_process');
let arguments = process.argv.splice(2);
let projectName = arguments[0] || 'coordination-cli';
child_process.execSync('git clone https://github.com/williamyu185/yonyou-cli.git ' + projectName, {}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }else {
      console.log('Download successful!');
    }
});
child_process.execSync('cd ./' + projectName + '&& rm -rf .git && cd ../', {}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});