let child_process = require('child_process');
let {colorLog} = require('./console.js');

let creatProject = (shellMsg) => {
  let afterClone = `cd ./${shellMsg.projectName} && rm -rf .git`;
  if(shellMsg.isInstall) {
    afterClone += ` && npm install && cd ../`;
  }else {
    afterClone += ` && cd ../`;
  }
  colorLog(`If the project is not created for a long time due to network reasons, please download the source zip package directly`, `cyan`);
  colorLog(`Download address: https://github.com/williamyu185/yonyou-cli`, `cyan`);
  let cloneProjectError = null;
  child_process.execSync(`git clone https://github.com/williamyu185/yonyou-cli.git ${shellMsg.projectName}`, {stdio: 'inherit'}, (error, stdout, stderr) => {
      if (error !== null) {
        cloneProjectError = error;
        console.log(`${error}`);
      }
  });
  if(cloneProjectError) {
    return;
  }
  child_process.exec(afterClone, {}, (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`${error}`);
    }else {
      colorLog(`Project created successfully!`);
    }
  });
};

module.exports = {
  creatProject
};