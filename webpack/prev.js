var merge = require('webpack-merge');
var config = require('./base.js');

module.exports = merge(config, {
    devtool: false
});
