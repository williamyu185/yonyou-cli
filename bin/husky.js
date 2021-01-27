#!/usr/bin/env node

let {postMerge} = require('./gitHooks/postMerge.js');
let {testBranch} = require('../huskyConfig.js');
let {isDesiredShellParam} = require('./utils');

let argvs = process.argv.splice(2);
let isPostMerge = false;

if(argvs.length) {
    argvs.forEach((item, index) => {
        if(isDesiredShellParam('^--git=.+', item)) {
            let param = item.split('=')[1];
            if(param == 'pullOrMerge') {
                isPostMerge = true;
            }
        }
    });
}
if(isPostMerge && testBranch.length) {
    postMerge();
}

module.exports = {};