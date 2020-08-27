#!/usr/bin/env node
let child_process = require('child_process');
let arguments = process.argv.splice(2);
let shellMsg = {
      projectName: 'coordination-cli',
      isInstall: false
    };
let isShellParam = function(param) {
  return /^-/ig.test(param);
};
arguments.forEach((item, index) => {
  if(isShellParam(item)) {
    if((item == '-i') || (item == '--install')) {
      shellMsg.isInstall = true;
    }
  }else {
    if(index == 0) {
      shellMsg.projectName = item;
    }
  }
});
let afterClone = 'cd ./' + shellMsg.projectName + ' && rm -rf .git && cd ../';
if(shellMsg.isInstall) {
  afterClone = 'cd ./' + shellMsg.projectName + ' && rm -rf .git && npm install && cd ../';;
}
child_process.exec('git clone https://github.com/williamyu185/yonyou-cli.git ' + shellMsg.projectName, {}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }else {
      child_process.exec(afterClone, {}, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }else {
          console.log('Project created successfully!');
        }
      });
    }
});