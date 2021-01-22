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
  let isPullRemoteBranchBeforePublish = ENVConfig.isPullRemoteBranchBeforePublish || false;
  if(isPullRemoteBranchBeforePublish) {
    colorLog(`\r\nPulling the remote branch corresponding to the local branch\r\n`);
    child_process.execSync(`git pull`, {stdio: 'inherit'});
    colorLog(`\r\n\r\n`);
  }
  if(execShell) {
    child_process.execSync(`${execShell}`, {stdio: 'inherit'});
    return;
  }
  let allPromise = [];
  child_process.execSync(`${cleanAndInstall} && ${cleanDist}`, {stdio: 'inherit'});
  colorLog(`\r\n============   The environments are being packaged,please wait!   ============\r\n\r\n\r\n\r\n`);
  child_process.execSync(`cross-env NODE_ENV=${crossEnv} webpack --progress --config ./webpack/${ENVConfig.webpackFile || copyOneOfENV}.js`, {stdio: 'inherit'});
  colorLog(`NODE_ENV ${crossEnv} created successfully!`);
  console.log(`\r\n-----------------------------\r\n\r\n\r\n\r\n`);
  let AdmZip = require('adm-zip');
  let zip = new AdmZip();
  zip.addLocalFolder(`${ENV_dist}`);
  zip.writeZip(`${ENV_dist}.zip`);
  child_process.exec(`rm -rf ./${ENV_dist}`, {});
  colorLog(`NODE_ENV ${crossEnv} were packaged successfully!\r\n`);
};

module.exports = {
  publishOneOfENVToDist
};