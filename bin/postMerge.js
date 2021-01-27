#!/usr/bin/env node

let child_process = require('child_process');
let {colorLog} = require('./utils.js');
let {testBranch} = require('../huskyConfig.js');

let postMerge = async () => {
    let localBranch = await new Promise((resolve, reject) => {
        child_process.exec(`git symbolic-ref --short HEAD`, {}, function(error, stdout, stderr) {
                if(error !== null) {
                    colorLog(error, 'red');
                    resolve('');
                }else {
                    resolve(stdout);
                }
            });
        });
    await new Promise((resolve, reject) => {
        child_process.exec(`git reflog -1`, {}, function(error, stdout, stderr) {
            if(error !== null) {
                colorLog(error, 'red');
                resolve(error);
            }else {
                let pullReg = /pull\sorigin\s(\w+?):/;
                let mergeReg = /merge\s(\w+?):/;
                let result = [];
                if(pullReg.test(stdout)) {
                    result = stdout.match(pullReg);
                }else if(mergeReg.test(stdout)) {
                    result = stdout.match(mergeReg);
                }
                let remoteBranch = '';
                if(result.length >= 2) {
                    remoteBranch = result[1];
                }
                if(remoteBranch && testBranch.indexOf(remoteBranch) != -1) {
                    if(testBranch.indexOf(localBranch) == -1) {
                        colorLog(`\r\n\r\n\r\n\r\n\r\nWarning: you have merge the ${remoteBranch} branch into the ${localBranch} branch\r\n\r\n\r\n\r\n\r\n`, 'redBG')
                        colorLog(`\r\n\r\nThis operation is dangerous.Please confirm this operation carefully!\r\n\r\n`, 'magentaBG')
                    }
                }
                resolve({remoteBranch});
            }
        });
    });
};

module.exports = {postMerge};