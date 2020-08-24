require('./configReplace');
let globalENVObj = require('../asset/utils/globalENVObj.js');

let globalYonyouCliTopLevelObj = globalENVObj.globalYonyouCliTopLevelObj;
let globalSeparateYonbipHostFileConfig = globalYonyouCliTopLevelObj.globalSeparateYonbipHostFileConfig;
let ENVHost = globalSeparateYonbipHostFileConfig[__ENV__];

module.exports = (ENVHost && (ENVHost instanceof Object)) ? ENVHost : globalSeparateYonbipHostFileConfig;
