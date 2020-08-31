#!/usr/bin/env node
let child_process = require('child_process');
let argvs = process.argv.splice(2);
let shellMsg = {
      projectName: 'coordination-cli',
      isInstall: false
    };
let isDesiredShellParam = function(regStr, param) {
  let regExp = new RegExp(regStr, 'ig');
  return regExp.test(param);
};
argvs.forEach((item, index) => {
  if(isDesiredShellParam('^-', item)) {
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
console.log('如因网络原因，执行指令后项目长时间未创建，请直接下载源码zip包')
console.log('下载地址：https://github.com/williamyu185/yonyou-cli')
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