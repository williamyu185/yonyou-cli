#!/usr/bin/env node
let child_process = require('child_process');
let ENVJson = require('../env.json');
let argvs = process.argv.splice(2);
let shellMsg = {
      projectName: 'coordination-cli',
      isInstall: false,
      isPublish: false,
      isCopyOneOfENVToDist: false,
      copyENV: ''
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
    if(item.indexOf('--env') !== -1) {
      shellMsg.isPublish = true;
    }
    if(item.indexOf('--copyOneOfENVToDist') !== -1) {
      shellMsg.isCopyOneOfENVToDist = true;
      shellMsg.copyENV = item.split('=')[1];
    }
  }else {
    if(index == 0) {
      shellMsg.projectName = item;
    }
  }
});
let ENV_dist = ENVJson['ENV_dist'];
let dist = ENVJson['dist'];
if(shellMsg.isCopyOneOfENVToDist) {
  let copyENV = shellMsg.copyENV;
  child_process.execSync(`rm -rf ./${ENV_dist} ./dist && unzip ./${ENV_dist}.zip`);
  child_process.exec(`cp -r ./${ENV_dist}/${copyENV}/. ${dist}`, {}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }else {
      console.log(`copy ${copyENV} successfully!`);
      child_process.exec(`rm -rf ./${ENV_dist}`);
    }
  });
  return;
}
if(shellMsg.isPublish) {
  let bale = ENVJson.bale;
  let allPromise = [];
  for(let ENV in bale) {
    let ENVConfig = bale[ENV];
    allPromise.push(new Promise((resolve, reject) => {
      child_process.exec(`cross-env NODE_ENV=${ENVConfig['NODE_ENV'] || ENV} webpack --progress --config ./webpack/${ENVConfig.webpackFile || ENV}.js`, {}, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error);
        }else {
          console.log(`NODE_ENV ${ENV} created successfully!`);
          resolve();
        }
      });
    }));
  }
  Promise.all(allPromise).then((resolve, reject) => {
    console.log(`All environments were packaged successfully!`);
    child_process.execSync(`zip -r ./${ENV_dist}.zip ./${ENV_dist} && rm -rf ./${ENV_dist}`)
  });
  return;
}
let afterClone = 'cd ./' + shellMsg.projectName + ' && rm -rf .git && cd ../';
if(shellMsg.isInstall) {
  afterClone = 'cd ./' + shellMsg.projectName + ' && rm -rf .git && npm install && cd ../';
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