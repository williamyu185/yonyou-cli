#!/usr/bin/env node
let child_process = require('child_process');
let ENVJson = require('../env.js');
let argvs = process.argv.splice(2);
let shellMsg = {
      projectName: 'coordination-cli',
      isInstall: false,
      isPublish: false,
      isCopyOneOfENVToDist: false,
      copyENV: '',
      isCreatProject: false
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
      shellMsg.isCreatProject = true;
    }
  }
});
let ENV_dist = ENVJson['ENV_dist'];
let dist = ENVJson['dist'];
if(shellMsg.isCopyOneOfENVToDist) {
  let unzip_ENV_dist = () => {
    return new Promise((resolve, reject) => {
      child_process.execSync(`rm -rf ./${ENV_dist} ${dist}`);
      child_process.exec(`unzip -o ./${ENV_dist}.zip -d ./${ENV_dist}`, (error, stdout, stderr) => {
        if (error !== null) {
          resolve(error);
        }else {
          resolve(null);
        }
      });
    });
  };
  let compatibleSolutions = async () => {
    let error = await unzip_ENV_dist();
    if(error !== null) {
      return Promise.resolve(error);
    }else {
      return Promise.resolve(null);
    }
  };
  compatibleSolutions().then((error) => {
    let copyENV = shellMsg.copyENV;
    if(error !== null) {
      child_process.execSync(`npm run cleanAndInstall && rm -rf ./${ENV_dist} ${dist}`);
      let AdmZip = require('adm-zip');
      let unzip = new AdmZip(`${ENV_dist}.zip`);
      unzip.extractAllTo(`${ENV_dist}`, true);
    }
    child_process.exec(`cp -fr ./${ENV_dist}/${copyENV}/. ${dist}`, {}, (error, stdout, stderr) => {
      if(error !== null) {
        console.log('exec error: ' + error);
      }else {
        console.log(`copy ${copyENV} successfully!`);
        child_process.exec(`rm -rf ./${ENV_dist}`);
      }
    });
  });
  return;
}
if(shellMsg.isPublish) {
  let bale = ENVJson.bale;
  let allPromise = [];
  for(let ENV in bale) {
    let ENVConfig = bale[ENV];
    allPromise.push(new Promise((resolve, reject) => {
      child_process.exec(ENVConfig.execShell || `cross-env NODE_ENV=${ENVConfig['NODE_ENV'] || ENV} webpack --progress --config ./webpack/${ENVConfig.webpackFile || ENV}.js`, {}, (error, stdout, stderr) => {
        if (error !== null) {
          console.log('exec error: ' + error);
          reject(error)
        }else {
          console.log(`NODE_ENV ${ENV} created successfully!`);
          resolve(null);
        }
      });
    }));
  }
  Promise.all(allPromise).then((arr) => {
    console.log(`All environments were packaged successfully!`);
    // new Promise((resolve, reject) => {
    //   child_process.exec(`zip -r ./${ENV_dist}.zip ./${ENV_dist} && rm -rf ./${ENV_dist}`, (error, stdout, stderr) => {
    //     if (error !== null) {
    //       reject(error);
    //     }else {
    //       resolve(null);
    //     }
    //   });
    // }).then(() => {
    //   child_process.exec(`rm -rf ./${ENV_dist}`);
    // }, () => {
    //   let zip = new AdmZip();
    //   zip.addLocalFolder(`${ENV_dist}`);
    //   zip.writeZip(`${ENV_dist}.zip`);
    //   child_process.exec(`rm -rf ./${ENV_dist}`);
    // });
    let AdmZip = require('adm-zip');
    let zip = new AdmZip();
    zip.addLocalFolder(`${ENV_dist}`);
    zip.writeZip(`${ENV_dist}.zip`);
    child_process.exec(`rm -rf ./${ENV_dist}`);
  }).catch((error) => {
    console.log('dist package failed');
  });;
  return;
}
if(!shellMsg.isCreatProject) {
  return;
}
let afterClone = 'cd ./' + shellMsg.projectName + ' && rm -rf .git && cd ../';
if(shellMsg.isInstall) {
  afterClone = 'cd ./' + shellMsg.projectName + ' && rm -rf .git && npm install && cd ../';
}
console.log('如因网络原因，执行指令后项目长时间未创建，请直接下载源码zip包')
console.log('下载地址：https://github.com/williamyu185/yonyou-cli')
child_process.exec('git clone https://github.com/williamyu185/yonyou-cli.git ' + shellMsg.projectName, {}, (error, stdout, stderr) => {
    if (error !== null) {
      console.log('exec error: ' + error);
    }else {
      child_process.exec(afterClone, {}, (error, stdout, stderr) => {
        if (error !== null) {
          console.log('exec error: ' + error);
        }else {
          console.log('Project created successfully!');
        }
      });
    }
});