require('./configReplace');
let globalENVObj = require('../asset/utils/globalENVObj.js');

let config = globalENVObj.globalSeparateYonbipHostFileConfig;
let ENVHost = config[__ENV__];

module.exports = (ENVHost && (ENVHost instanceof Object)) ? ENVHost : config;
