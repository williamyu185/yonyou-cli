let child_process = require('child_process');
let {colorLog} = require('./console.js');

let copyOneOfENVToDist = (shellMsg) => {
  let {
    ENV_dist,
    dist,
    cleanAndInstall,
    clean__ENV_dist__Dist
  } = shellMsg.distRelated;
  let unzip_ENV_dist = () => {
    return new Promise((resolve, reject) => {
      child_process.execSync(`${clean__ENV_dist__Dist}`, {stdio: 'inherit'});
      child_process.exec(`unzip -o ./${ENV_dist}.zip -d ./${ENV_dist}`, {}, (error, stdout, stderr) => {
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
      child_process.execSync(`${cleanAndInstall} && ${clean__ENV_dist__Dist}`, {stdio: 'inherit'});
      let AdmZip = require('adm-zip');
      let unzip = new AdmZip(`${ENV_dist}.zip`);
      unzip.extractAllTo(`${ENV_dist}`, true);
    }
    child_process.exec(`cp -fr ./${ENV_dist}/${copyENV}/. ${dist}`, {}, (error, stdout, stderr) => {
      if(error !== null) {
        console.log(`${error}`);
      }else {
        colorLog(`copy ${copyENV} successfully!`);
      }
      child_process.exec(`rm -rf ./${ENV_dist}`, {});
    });
  });
};

module.exports = {
  copyOneOfENVToDist
};