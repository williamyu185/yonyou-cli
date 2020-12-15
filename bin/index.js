#!/usr/bin/env node

let ENVJson = require('../env.js');
let {creatProject} = require('./creatProject.js');
let {publishAll} = require('./publishAll.js');
let {copyOneOfENVToDist} = require('./copyOneOfENVToDist.js');

let argvs = process.argv.splice(2);

let ENV_dist = ENVJson['ENV_dist'] || 'ENV_dist';
let dist = ENVJson['dist'] || './dist';
let cleanAndInstall = ENVJson['cleanAndInstall'] || `rm -rf ./node_modules && npm install`;
let cleanDist = ENVJson['cleanDist'] || `rm -rf ./${ENV_dist} ./${ENV_dist}.zip ${dist}`;
let clean__ENV_dist__Dist = `rm -rf ./${ENV_dist} ${dist}`;

let isPublishAll = false;
let isCopyOneOfENVToDist = false;
let isCreatProject = false;

let shellMsg = {
      projectName: 'coordination-cli',
      copyENV: '',
      isInstall: false,
      distRelated: {
        ENV_dist,
        dist,
        cleanAndInstall,
        cleanDist,
        clean__ENV_dist__Dist
      }
    };
let isDesiredShellParam = (regStr, param) => {
  let regExp = new RegExp(regStr, 'ig');
  return regExp.test(param);
};
!argvs.length && (shellMsg.isCreatProject = true);
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
  }else {
    if(index == 0) {
      shellMsg.projectName = item;
      isCreatProject = true;
    }
  }
});

if(isCopyOneOfENVToDist) {
  copyOneOfENVToDist(shellMsg);
  return;
}
if(isPublishAll) {
  publishAll(shellMsg);
  return;
}
if(isCreatProject) {
  creatProject(shellMsg);
  return;
}
