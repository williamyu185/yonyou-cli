require('./configReplace');
let globalENVObj = require('../asset/utils/globalENVObj.js');

let globalYonyouCoordinationCliTopLevelObj = globalENVObj.globalYonyouCoordinationCliTopLevelObj;
let separateYonbipHostFileConfig = globalYonyouCoordinationCliTopLevelObj.separateYonbipHostFileConfig;
let ENVHost = separateYonbipHostFileConfig[__ENV__];

module.exports = (ENVHost && (ENVHost instanceof Object)) ? ENVHost : separateYonbipHostFileConfig;
