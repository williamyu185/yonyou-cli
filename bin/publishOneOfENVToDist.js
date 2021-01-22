let child_process = require('child_process');
let {colorLog} = require('./console.js');
let ENVJson = require('../env.js');

let publishOneOfENVToDist = async (shellMsg) => {
  let {
    ENV_dist,
    cleanAndInstall,
    cleanDist
  } = shellMsg.distRelated;
  let {bale} = ENVJson;
  let copyOneOfENV = shellMsg.copyOneOfENV;
  let ENVConfig = bale[copyOneOfENV];
  let crossEnv = ENVConfig['NODE_ENV'] || copyOneOfENV;
  let execShell = ENVConfig.execShell;
  let isPullRemoteBranchBeforePublish = ENVJson.isPullRemoteBranchBeforePublish || false;
  if(isPullRemoteBranchBeforePublish) {
    colorLog(`Pulling the remote branch corresponding to the local branch`);
    await new Promise((resolve, reject) => {
      child_process.exec(`git pull`, {stdio: 'inherit'}, (error, stdout, stderr) => {
        colorLog(`\r\n============   Git output information   ============\r\n`);
        if(error !== null) {
          colorLog(`\r\n${error}\r\n\r\n\r\n\r\n`, 'red');
          reject();
        }else {
          colorLog(`\r\n${stdout}\r\n\r\n\r\n\r\n`);
          resolve();
        }
      });
    });
  }
  if(execShell) {
    child_process.execSync(`${execShell}`, {stdio: 'inherit'});
    return;
  }
  let allPromise = [];
  child_process.execSync(`${cleanAndInstall} && ${cleanDist}`, {stdio: 'inherit'});
  colorLog(`\r\n============   The environments are being packaged,please wait!   ============\r\n\r\n\r\n\r\n`);
  allPromise.push(new Promise((resolve, reject) => {
    child_process.exec(`cross-env NODE_ENV=${crossEnv} webpack --progress --config ./webpack/${ENVConfig.webpackFile || ENV}.js`, {}, (error, stdout, stderr) => {
      if (error !== null) {
        console.log(`${error}`);
        reject(error)
      }else {
        console.log(`${stdout}`);
        colorLog(`NODE_ENV ${crossEnv} created successfully!`);
        console.log(`\r\n-----------------------------\r\n\r\n\r\n\r\n`);
        resolve(null);
      }
    });
  }));
  Promise.all(allPromise).then((arr) => {
    let AdmZip = require('adm-zip');
    let zip = new AdmZip();
    zip.addLocalFolder(`${ENV_dist}`);
    zip.writeZip(`${ENV_dist}.zip`);
    child_process.exec(`rm -rf ./${ENV_dist}`, {});
    colorLog(`NODE_ENV ${crossEnv} were packaged successfully!\r\n`);
  }).catch((error) => {
    colorLog(`dist package failed!`, `red`);
  });
};

module.exports = {
  publishOneOfENVToDist
};