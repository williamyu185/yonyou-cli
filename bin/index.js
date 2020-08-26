#!/usr/bin/env node
let child_process = require('child_process');
let arguments = process.argv.splice(2);
let projectName = arguments[0] || 'coordination-cli';
let isInstall = false;
arguments.forEach((item, index) => {
  if(index == 0) {
    return;
  }
  if(item == '-i' || item == '--install') {
    isInstall = true;
  }
});
let afterClone = 'cd ./' + projectName + ' && rm -rf .git && cd ../';
if(isInstall) {
  afterClone = 'cd ./' + projectName + ' && rm -rf .git && npm install && cd ../';;
}
child_process.exec('git clone https://github.com/williamyu185/yonyou-cli.git ' + projectName, {}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }else {
      console.log('Download successful!');
      child_process.exec(afterClone, {}, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    }
});