#!/usr/bin/env node
let child_process = require('child_process');
let arguments = process.argv.splice(2);
let isInstall = false;
let shellMsg = {
      projectName: 'coordination-cli'
    };
let isShellParams = function(param) {
  return /^-/ig.test(item);
};
arguments.forEach((item, index) => {
  if(isShellParams(item)) {
    if(item == '-i' || item == '--install') {
      isInstall = true;
    }
  }else {
    (index == 0) && (shellMsg.projectName = item);
  }
});
let afterClone = 'cd ./' + shellMsg.projectName + ' && rm -rf .git && cd ../';
if(isInstall) {
  afterClone = 'cd ./' + shellMsg.projectName + ' && rm -rf .git && npm install && cd ../';;
}
child_process.exec('git clone https://github.com/williamyu185/yonyou-cli.git ' + shellMsg.projectName, {}, function (error, stdout, stderr) {
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