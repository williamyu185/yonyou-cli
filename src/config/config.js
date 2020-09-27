require('./configReplace');
let globalENVObj = require('../asset/utils/globalENVObj.js');

let globalUniquenessCoordinationCliTopLevelObj = globalENVObj.globalUniquenessCoordinationCliTopLevelObj;
let separateHostFileConfig = globalUniquenessCoordinationCliTopLevelObj.separateHostFileConfig;
let ENVHost = separateHostFileConfig[__ENV__];

module.exports = (ENVHost && (ENVHost instanceof Object)) ? ENVHost : separateHostFileConfig;
