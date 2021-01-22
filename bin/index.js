#!/usr/bin/env node

let ENVJson = require('../env.js');
let {createProject} = require('./createProject.js');
let {publishAll} = require('./publishAll.js');
let {copyOneOfENVToDist} = require('./copyOneOfENVToDist.js');
let {publishOneOfENVToDist} = require('./publishOneOfENVToDist.js');

let argvs = process.argv.splice(2);

let ENV_dist = ENVJson['ENV_dist'] || 'ENV_dist';
let dist = ENVJson['dist'] || './dist';
let cleanAndInstall = ENVJson['cleanAndInstall'] || `rm -rf ./node_modules && npm install`;
let cleanDist = ENVJson['cleanDist'] || `rm -rf ./${ENV_dist} ./${ENV_dist}.zip ${dist}`;
let clean__ENV_dist__Dist = `rm -rf ./${ENV_dist} ${dist}`;

let distRelated = {
      ENV_dist,
      dist,
      cleanAndInstall,
      cleanDist,
      clean__ENV_dist__Dist
    };
let shellMsg = {
      projectName: 'coordination-cli',
      copyENV: '',
      isInstall: false,
      distRelated,
      copyOneOfENV: ''
    };

let isPublishAll = false;
let isCopyOneOfENVToDist = false;
let isCreateProject = false;
let isPublishOneOfENVToDist = false;

let isDesiredShellParam = (regStr, param) => {
  let regExp = new RegExp(regStr, 'ig');
  return regExp.test(param);
};
if(argvs.length) {
  argvs.forEach((item, index) => {
    if(isDesiredShellParam('^-', item)) {
      if((item == '-i') || (item == '--install')) {
        shellMsg.isInstall = true;
      }
      if(isDesiredShellParam('^--publishAll', item)) {
        isPublishAll = true;
      }
      if(isDesiredShellParam('^--copyOneOfENVToDist=.+', item)) {
        isCopyOneOfENVToDist = true;
        shellMsg.copyENV = item.split('=')[1];
      }
      if(isDesiredShellParam('^--publishOneOfENVToDist=.+', item)) {
        isCopyOneOfENVToDist = true;
        shellMsg.copyOneOfENV = item.split('=')[1];
      }
      return;
    }
    if(index == 0) {
      if(argvs.length) {
        shellMsg.projectName = item;
        isCreateProject = true;
      }
    }
  });
}else {
  isCreateProject = true;
}
if(isCopyOneOfENVToDist) {
  copyOneOfENVToDist(shellMsg);
  return;
}
if(isPublishAll) {
  publishAll(shellMsg);
  return;
}
if(isCreateProject) {
  createProject(shellMsg);
  return;
}
if(isPublishOneOfENVToDist) {
  publishOneOfENVToDist(shellMsg);
  return;
}
